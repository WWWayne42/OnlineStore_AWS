export const menuBar = {
  display: 'flex',
  gap: '64px',
  flexGrow: 1,
  justifyContent: 'center',
  position: 'relative',
  zIndex: 100,
};

export const menuItem = {
  position: 'relative',
  fontWeight: 'bold',
  cursor: 'pointer',
};

export const menuText = {
  fontSize: '16px',
  padding: '6px 10px',
  transition: 'color 0.2s ease',
};

export const dropdown = {
  position: 'absolute',
  top: '30px',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: 'white',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  padding: '8px 12px',
  borderRadius: '6px',
  zIndex: 999,
  minWidth: '140px',
};

export const dropdownItem = {
  padding: '6px 0',
  fontSize: '14px',
  cursor: 'pointer',
  transition: 'color 0.2s ease',
};

export const actions = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
};

export const searchBox = {
  padding: '6px 12px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '14px',
  width: '200px',
};

export const searchButton = {
  padding: '8px 16px',
  fontSize: '14px',
  backgroundColor: 'green',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
};
