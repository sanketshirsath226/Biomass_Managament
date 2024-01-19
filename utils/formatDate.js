export const formatDate = (date, format = 'MMMM d, yyyy') => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    if (format !== 'MMMM d, yyyy') {
      options.weekday = 'short';
      options.hour = 'numeric';
      options.minute = 'numeric';
    }
    return new Date(date).toLocaleDateString('en-US', options);
  };