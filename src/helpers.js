export function getCsrfToken() {
    const csrfTokenTag = document.querySelector('meta[name="csrf-token"]');
    return csrfTokenTag ? csrfTokenTag.content : null;
  }
