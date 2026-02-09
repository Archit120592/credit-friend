export const formatCurrency = (value, currency = 'INR') => {
  if (value == null) return '-';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value, decimals = 2) => {
  if (value == null) return '-';
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

export const formatPercent = (value, decimals = 1) => {
  if (value == null) return '-';
  return `${Number(value).toFixed(decimals)}%`;
};

export const formatDate = (date) => {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const getRiskColor = (risk) => {
  const colors = {
    low: '#2e7d32',
    medium: '#ff9800',
    high: '#d32f2f',
    critical: '#b71c1c',
  };
  return colors[risk?.toLowerCase()] || '#636e72';
};

export const getStatusColor = (status) => {
  const colors = {
    active: 'success',
    pending: 'warning',
    rejected: 'error',
    draft: 'default',
    approved: 'success',
    review: 'info',
  };
  return colors[status?.toLowerCase()] || 'default';
};
