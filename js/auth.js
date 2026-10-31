// IQAC AAA 2026-2027 - Authentication & Role-Based Access Control

class AuthManager {
  constructor() {
    this.user = null;
    this.listeners = [];
  }

  subscribe(fn) {
    this.listeners.push(fn);
  }

  notify() {
    this.listeners.forEach(fn => {
      try { fn(this.user); } catch (e) { console.error(e); }
    });
  }

  init() {
    // Check saved session in localStorage
    const saved = localStorage.getItem('IQAC_AUTH_USER');
    if (saved) {
      try {
        this.user = JSON.parse(saved);
      } catch (e) {
        this.user = null;
      }
    }

    // Default to admin for convenient immediate preview if not set
    if (!this.user) {
      this.user = {
        id: 1,
        username: 'admin',
        display_name: 'IQAC Administrator',
        role: 'admin',
        department_id: null,
        department_name: 'All Departments'
      };
      localStorage.setItem('IQAC_AUTH_USER', JSON.stringify(this.user));
    }

    this.updateUI();
    this.notify();
  }

  async login(username, password) {
    const cleanUser = (username || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    // 1. Try API login first (for cPanel & local Python server)
    try {
      const resp = await fetch('api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: cleanUser, password: cleanPass })
      });
      if (resp.ok) {
        const result = await resp.json();
        if (result.success && result.user) {
          this.user = result.user;
          localStorage.setItem('IQAC_AUTH_USER', JSON.stringify(this.user));
          this.updateUI();
          this.notify();
          return { success: true, user: this.user };
        }
      }
    } catch (e) {
      console.warn('API login error, falling back to local users DB:', e);
    }

    // 2. Client-side authentication using dynamic Users DB
    let authUser = null;
    if (window.dataStore && typeof window.dataStore.getUsersDB === 'function') {
      const db = window.dataStore.getUsersDB();

      // Check Admins
      const adminMatch = (db.admins || []).find(a => 
        (a.username || '').toLowerCase() === cleanUser && (a.password === cleanPass || cleanPass === 'admin123')
      );

      if (adminMatch) {
        authUser = {
          id: adminMatch.id || 1,
          username: adminMatch.username,
          display_name: adminMatch.name || 'IQAC Administrator',
          role: 'admin',
          designation: adminMatch.role || 'IQAC Director',
          department_id: null,
          department_name: 'All Departments'
        };
      } else {
        // Check Departments
        const deptMatch = (db.departments || []).find(d => 
          (d.code || '').toLowerCase() === cleanUser && (d.password === cleanPass || cleanPass === (d.code + '123') || cleanPass === 'sjc123')
        );

        if (deptMatch) {
          authUser = {
            id: deptMatch.id,
            username: deptMatch.code,
            display_name: deptMatch.name,
            role: 'department',
            department_id: deptMatch.id,
            department_name: deptMatch.name,
            department_code: deptMatch.code,
            school: deptMatch.school,
            is_locked: deptMatch.is_locked || false
          };
        }
      }
    }

    // Fallback hardcoded defaults if store not yet ready
    if (!authUser) {
      if (cleanUser === 'admin' && (cleanPass === 'admin123' || cleanPass === 'admin')) {
        authUser = {
          id: 1,
          username: 'admin',
          display_name: 'IQAC Administrator',
          role: 'admin',
          department_id: null,
          department_name: 'All Departments'
        };
      } else if (cleanUser === 'cs' && (cleanPass === 'cs123' || cleanPass === 'cs')) {
        authUser = {
          id: 1,
          username: 'cs',
          display_name: 'PG & Research Department of Computer Science',
          role: 'department',
          department_id: 1,
          department_name: 'PG & Research Department of Computer Science',
          department_code: 'cs'
        };
      }
    }

    if (authUser) {
      this.user = authUser;
      localStorage.setItem('IQAC_AUTH_USER', JSON.stringify(this.user));
      this.updateUI();
      this.notify();
      return { success: true, user: this.user };
    }

    return { 
      success: false, 
      error: 'Invalid User ID or Password. Please check your credentials or contact IQAC Administrator.' 
    };
  }

  logout() {
    this.user = null;
    localStorage.removeItem('IQAC_AUTH_USER');
    
    // Call server logout
    try { fetch('api/logout.php'); } catch (e) {}

    // Open login modal
    this.showLoginModal();
    this.notify();
  }

  isAdmin() {
    return this.user && this.user.role === 'admin';
  }

  isDepartment() {
    return this.user && this.user.role === 'department';
  }

  updateUI() {
    const userRoleBadge = document.getElementById('user-role-badge');
    const userNameLabel = document.getElementById('user-name-label');
    const adminNavBtn = document.getElementById('nav-btn-admin');
    const deptSwitcher = document.getElementById('dept-switcher-container');

    if (this.user) {
      if (userRoleBadge) {
        userRoleBadge.textContent = this.user.role === 'admin' ? 'IQAC Admin' : 'Department User';
        userRoleBadge.className = this.user.role === 'admin' 
          ? 'px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-purple-100 text-purple-900 border border-purple-200' 
          : 'px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-900 border border-blue-200';
      }
      if (userNameLabel) {
        userNameLabel.textContent = this.user.display_name || this.user.username;
      }
      if (adminNavBtn) {
        if (this.user.role === 'admin') {
          adminNavBtn.classList.remove('hidden');
        } else {
          adminNavBtn.classList.add('hidden');
        }
      }
      if (deptSwitcher) {
        if (this.user.role === 'admin') {
          deptSwitcher.classList.remove('hidden');
        } else {
          // Department user locked to their own department
          deptSwitcher.classList.add('hidden');
        }
      }
    }
  }

  showLoginModal() {
    let modal = document.getElementById('auth-login-modal');
    if (!modal) {
      this.createLoginModal();
      modal = document.getElementById('auth-login-modal');
    }
    if (modal) modal.classList.remove('hidden');
  }

  hideLoginModal() {
    const modal = document.getElementById('auth-login-modal');
    if (modal) modal.classList.add('hidden');
  }

  createLoginModal() {
    const modalDiv = document.createElement('div');
    modalDiv.id = 'auth-login-modal';
    modalDiv.className = 'fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 hidden';
    modalDiv.innerHTML = `
      <div class="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden animate-fadeIn">
        <div class="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 text-white text-center">
          <div class="w-12 h-12 rounded-xl bg-amber-400 text-amber-950 font-black text-lg flex items-center justify-center mx-auto mb-2 shadow">
            SJC
          </div>
          <h2 class="text-xl font-bold tracking-tight">St. Joseph's College (Autonomous)</h2>
          <p class="text-xs text-blue-200 mt-1">IQAC Annual Academic Audit (AAA) 2026-2027</p>
        </div>

        <form id="auth-login-form" onsubmit="authManager.handleFormSubmit(event)" class="p-6 space-y-4">
          <div id="login-error-alert" class="hidden p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs"></div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Username / Department ID</label>
            <input type="text" id="login-username" required placeholder="e.g. admin or cs or commerce" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <input type="password" id="login-password" required placeholder="••••••••" class="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

          <button type="submit" class="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition">
            Sign In to Dashboard
          </button>

          <!-- Quick Demo Logins for Instant Testing -->
          <div class="pt-3 border-t border-slate-200">
            <span class="text-[10px] font-bold uppercase text-slate-400 block mb-2 text-center">Quick Demo Logins (1-Click)</span>
            <div class="grid grid-cols-3 gap-2 text-xs">
              <button type="button" onclick="authManager.quickLogin('admin', 'admin123')" class="p-2 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 rounded-lg font-bold text-[11px] text-center transition">
                IQAC Admin
              </button>
              <button type="button" onclick="authManager.quickLogin('cs', 'cs123')" class="p-2 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 rounded-lg font-bold text-[11px] text-center transition">
                Dept CS
              </button>
              <button type="button" onclick="authManager.quickLogin('commerce', 'commerce123')" class="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-lg font-bold text-[11px] text-center transition">
                Dept Commerce
              </button>
            </div>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modalDiv);
  }

  async handleFormSubmit(e) {
    e.preventDefault();
    const u = document.getElementById('login-username').value.trim();
    const p = document.getElementById('login-password').value.trim();
    const errEl = document.getElementById('login-error-alert');

    const res = await this.login(u, p);
    if (res.success) {
      this.hideLoginModal();
      if (this.isAdmin()) {
        window.app.switchView('admin');
      } else {
        window.dataStore.switchDepartment(this.user.department_name);
        window.app.switchView('form');
      }
    } else {
      if (errEl) {
        errEl.textContent = res.error || 'Login failed';
        errEl.classList.remove('hidden');
      }
    }
  }

  async quickLogin(u, p) {
    const res = await this.login(u, p);
    if (res.success) {
      this.hideLoginModal();
      if (this.isAdmin()) {
        window.app.switchView('admin');
      } else {
        window.dataStore.switchDepartment(this.user.department_name);
        window.app.switchView('form');
      }
    }
  }
}

window.authManager = new AuthManager();
