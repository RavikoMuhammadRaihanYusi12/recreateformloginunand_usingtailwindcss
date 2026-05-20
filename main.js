// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    anchorPlacement: 'top-bottom',
  });

  // Automatically trigger the custom welcome modal on load
  setTimeout(showWelcomeModal, 500);
});

// Toast Notification Manager
function showToast(message, type = 'success') {
  const toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) return;

  const toast = document.createElement('div');
  toast.className = `flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/50 transform translate-y-2 opacity-0 transition-all duration-300 max-w-sm w-full`;

  // Dynamic status icon based on notification type
  let icon = '';
  if (type === 'success') {
    icon = `<span class="p-1.5 bg-emerald-50 text-unand-green rounded-xl flex-shrink-0 border border-emerald-100/30">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4"></path>
              </svg>
            </span>`;
  } else if (type === 'info') {
    icon = `<span class="p-1.5 bg-sky-50 text-sky-600 rounded-xl flex-shrink-0 border border-sky-100/30">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </span>`;
  } else if (type === 'warning') {
    icon = `<span class="p-1.5 bg-amber-50 text-amber-600 rounded-xl flex-shrink-0 border border-amber-100/30">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </span>`;
  } else {
    icon = `<span class="p-1.5 bg-rose-50 text-rose-600 rounded-xl flex-shrink-0 border border-rose-100/30">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </span>`;
  }

  toast.innerHTML = `
    ${icon}
    <div class="flex-grow text-xs font-semibold text-slate-700 leading-tight">${message}</div>
    <button type="button" class="text-slate-400 hover:text-slate-600 transition flex-shrink-0">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  `;

  // Register close click event
  const closeBtn = toast.querySelector('button');
  closeBtn.addEventListener('click', () => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  });

  toastContainer.appendChild(toast);

  // Animate toast entry
  setTimeout(() => {
    toast.classList.remove('opacity-0', 'translate-y-2');
  }, 50);

  // Auto remove toast after 4 seconds
  setTimeout(() => {
    if (toast.parentNode) {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }
  }, 4500);
}

// Modal Prompt Handling functions
const welcomeModal = document.getElementById('welcomeModal');
const userNameInputModal = document.getElementById('userNameInputModal');
const confirmNameBtn = document.getElementById('confirmNameBtn');

function showWelcomeModal() {
  if (!welcomeModal) return;
  welcomeModal.classList.remove('opacity-0', 'pointer-events-none');
  const modalContent = welcomeModal.querySelector('div');
  if (modalContent) {
    modalContent.classList.remove('scale-95');
    modalContent.classList.add('scale-100');
  }
  userNameInputModal.focus();
}

function hideWelcomeModal() {
  if (!welcomeModal) return;
  const modalContent = welcomeModal.querySelector('div');
  if (modalContent) {
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-95');
  }
  welcomeModal.classList.add('opacity-0', 'pointer-events-none');
}

// Modal Trigger Confirm Click
if (confirmNameBtn) {
  confirmNameBtn.addEventListener('click', () => {
    const rawName = userNameInputModal.value.trim();
    const finalName = rawName || 'Tamu Akademis';
    
    hideWelcomeModal();
    
    // Simulate natural sequence of welcome notifications
    setTimeout(() => {
      showToast(`Selamat datang, <strong>${finalName}</strong>!`, 'success');
    }, 400);

    setTimeout(() => {
      showToast('Silakan mengisi Form tersebut untuk masuk ke portal.', 'info');
    }, 1200);
  });
}

// Auto-trigger on pressing Enter inside Modal input
if (userNameInputModal) {
  userNameInputModal.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      confirmNameBtn.click();
    }
  });
}

// Password Visibility Toggle Logic
const togglePasswordBtn = document.getElementById('togglePasswordBtn');
const passwordInput = document.getElementById('passwordInput');
const eyeOpenIcon = document.getElementById('eyeOpenIcon');
const eyeCloseIcon = document.getElementById('eyeCloseIcon');

if (togglePasswordBtn && passwordInput) {
  togglePasswordBtn.addEventListener('click', () => {
    const isPasswordType = passwordInput.getAttribute('type') === 'password';
    
    if (isPasswordType) {
      passwordInput.setAttribute('type', 'text');
      eyeOpenIcon.classList.remove('hidden');
      eyeCloseIcon.classList.add('hidden');
    } else {
      passwordInput.setAttribute('type', 'password');
      eyeOpenIcon.classList.add('hidden');
      eyeCloseIcon.classList.remove('hidden');
    }
  });
}

// Login form submit handler & validation
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('usernameInput');
const submitBtn = document.getElementById('submitBtn');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    // NIM/NIP input checks: standard academic format is strictly numbers
    const numericRegex = /^\d+$/;
    if (!numericRegex.test(username)) {
      showToast('NIM / NIP tidak valid! Harus berupa deretan angka tanpa spasi.', 'warning');
      usernameInput.focus();
      return;
    }

    if (password.length < 4) {
      showToast('Password terlalu pendek! Harap periksa kembali password Anda.', 'error');
      passwordInput.focus();
      return;
    }

    // Secure simulated authentication flow
    if (submitBtn) {
      submitBtn.disabled = true;
      const initialBtnHTML = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Memverifikasi Akun...</span>
      `;

      showToast('Menghubungkan ke server autentikasi LPTIK...', 'info');

      // Seamless redirection mimic
      setTimeout(() => {
        showToast('Kredensial cocok! Mengalihkan ke Portal UNAND...', 'success');
        
        setTimeout(() => {
          window.location.href = "http://portal.unand.ac.id/";
        }, 1000);
      }, 2000);
    }
  });
}