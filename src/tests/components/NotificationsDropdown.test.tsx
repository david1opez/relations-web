import { render, screen, fireEvent } from '@testing-library/react';
import NotificationsDropdown from '@/components/notificationsDropdown/NotificationsDropdown';
import GetNotifications from '@/utils/GetNotifications';

// Mock GetNotifications
jest.mock('@/utils/GetNotifications', () => ({
  __esModule: true,
  default: jest.fn()
}));

describe('NotificationsDropdown Component', () => {
  const mockNotifications = [
    { id: 1, title: 'Test Notification 1', isRead: false },
    { id: 2, title: 'Test Notification 2', isRead: true }
  ];

  beforeEach(() => {
    (GetNotifications as jest.Mock).mockResolvedValue(mockNotifications);
  });

  it('shows loading state initially', async () => {
    render(<NotificationsDropdown />);
    const bellIcon = screen.getByRole('img', { name: 'bell' });
    fireEvent.click(bellIcon);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows no notifications message when array is empty', async () => {
    (GetNotifications as jest.Mock).mockResolvedValue([]);
    render(<NotificationsDropdown />);
    const bellIcon = screen.getByRole('img', { name: 'bell' });
    fireEvent.click(bellIcon);
    expect(await screen.findByText('Sin notificaciones')).toBeInTheDocument();
  });

  it('shows notifications when array has items', async () => {
    render(<NotificationsDropdown />);
    const bellIcon = screen.getByRole('img', { name: 'bell' });
    fireEvent.click(bellIcon);
    expect(await screen.findByText('Test Notification 1')).toBeInTheDocument();
    expect(await screen.findByText('Test Notification 2')).toBeInTheDocument();
  });

  it('shows notification dot when there are unread notifications', async () => {
    render(<NotificationsDropdown />);
    const notificationDot = await screen.findByTestId('notification-dot');
    expect(notificationDot).toBeInTheDocument();
  });

  it('closes dropdown when clicking outside', async () => {
    render(<NotificationsDropdown />);
    const bellIcon = screen.getByRole('img', { name: 'bell' });
    fireEvent.click(bellIcon);
    expect(await screen.findByText('Test Notification 1')).toBeInTheDocument();
    fireEvent.mouseDown(document.body);
    expect(screen.queryByText('Test Notification 1')).not.toBeInTheDocument();
  });
}); 