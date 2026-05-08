import { useState, useEffect, useCallback } from 'react';

export default function Toast({ message, type }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 2800);
      return () => clearTimeout(timer);
    }
  }, [message, type]);

  const className = `toast ${type || 'success'} ${visible ? 'show' : ''}`;

  return (
    <div className={className} id="toast">
      {message}
    </div>
  );
}
