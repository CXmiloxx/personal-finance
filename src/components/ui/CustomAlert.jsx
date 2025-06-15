import Swal from 'sweetalert2';

const showAlert = (type, title, message, duration = 3000) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: duration,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
    customClass: {
      popup: 'rounded-lg shadow-lg border border-opacity-20 backdrop-blur-sm',
      title: 'font-semibold text-base',
      htmlContainer: 'text-sm opacity-90',
      timerProgressBar: 'bg-white bg-opacity-30'
    }
  });

  const config = {
    success: {
      icon: 'success',
      iconColor: '#ffffff',
      background: '#10B981',
      color: '#ffffff',
      title: `<div class="flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        ${title}
      </div>`,
      html: `<div class="pl-7">${message}</div>`
    },
    error: {
      icon: 'error',
      iconColor: '#ffffff',
      background: '#EF4444',
      color: '#ffffff',
      title: `<div class="flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        ${title}
      </div>`,
      html: `<div class="pl-7">${message}</div>`
    },
    warning: {
      icon: 'warning',
      iconColor: '#ffffff',
      background: '#F59E0B',
      color: '#ffffff',
      title: `<div class="flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
        ${title}
      </div>`,
      html: `<div class="pl-7">${message}</div>`
    },
    info: {
      icon: 'info',
      iconColor: '#ffffff',
      background: '#3B82F6',
      color: '#ffffff',
      title: `<div class="flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        ${title}
      </div>`,
      html: `<div class="pl-7">${message}</div>`
    }
  };

  return Toast.fire({
    ...config[type],
    padding: '1rem',
    width: 'auto',
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  });
};

export const CustomAlert = {
  success: (title, message, duration) => showAlert('success', title, message, duration),
  error: (title, message, duration) => showAlert('error', title, message, duration),
  warning: (title, message, duration) => showAlert('warning', title, message, duration),
  info: (title, message, duration) => showAlert('info', title, message, duration)
};

