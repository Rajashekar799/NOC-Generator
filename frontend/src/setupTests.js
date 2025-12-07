import '@testing-library/jest-dom';

// Mock CSS imports before modules are loaded
jest.mock('react-toastify/dist/ReactToastify.css', () => ({}));
