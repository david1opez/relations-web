import { render, screen, fireEvent, act } from '@testing-library/react';
import NotificationsDropdown from '../../components/notificationsDropdown/NotificationsDropdown';

// Mock de GetNotifications
jest.mock('@/utils/GetNotifications', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('NotificationsDropdown Component', () => {
  const mockNotifications = [
    { id: 1, title: 'Test Notification 1', isRead: false },
    { id: 2, title: 'Test Notification 2', isRead: true },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (require('@/utils/GetNotifications').default as jest.Mock).mockResolvedValue(mockNotifications);
  });

  it('renders bell icon', () => {
    render(<NotificationsDropdown />);
    const bellIcon = screen.getByRole('img', { name: 'bell' });
    expect(bellIcon).toBeInTheDocument();
  });

  it('shows notification dot when there are unread notifications', async () => {
    render(<NotificationsDropdown />);
    await act(async () => {
      await Promise.resolve();
    });
    const notificationDot = document.querySelector('.notificationDot');
    expect(notificationDot).toBeInTheDocument();
  });

  it('toggles dropdown when clicking bell icon', async () => {
    render(<NotificationsDropdown />);
    await act(async () => {
      await Promise.resolve();
    });

    const bellIcon = screen.getByRole('img', { name: 'bell' });
    fireEvent.click(bellIcon);

    expect(screen.getByText('Test Notification 1')).toBeInTheDocument();
    expect(screen.getByText('Test Notification 2')).toBeInTheDocument();
  });

  it('shows loading state initially', () => {
    render(<NotificationsDropdown />);
    expect(screen.getByTestId('activity-indicator')).toBeInTheDocument();
  });

  it('shows no notifications message when array is empty', async () => {
    (require('@/utils/GetNotifications').default as jest.Mock).mockResolvedValue([]);
    
    render(<NotificationsDropdown />);
    await act(async () => {
      await Promise.resolve();
    });

    const bellIcon = screen.getByRole('img', { name: 'bell' });
    fireEvent.click(bellIcon);

    expect(screen.getByText('Sin notificaciones')).toBeInTheDocument();
  });

  it('closes dropdown when clicking outside', async () => {
    render(<NotificationsDropdown />);
    await act(async () => {
      await Promise.resolve();
    });

    const bellIcon = screen.getByRole('img', { name: 'bell' });
    fireEvent.click(bellIcon);

    expect(screen.getByText('Test Notification 1')).toBeInTheDocument();

    fireEvent.mouseDown(document.body);

    expect(screen.queryByText('Test Notification 1')).not.toBeInTheDocument();
  });

  it('marks notifications as read when opening dropdown', async () => {
    render(<NotificationsDropdown />);
    await act(async () => {
      await Promise.resolve();
    });

    const bellIcon = screen.getByRole('img', { name: 'bell' });
    fireEvent.click(bellIcon);

    // La notificación debería estar marcada como leída
    const notificationDot = document.querySelector('.notificationDot');
    expect(notificationDot).not.toBeInTheDocument();
  });
}); 