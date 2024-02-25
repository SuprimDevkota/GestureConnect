import { INotification } from "../types/notification";

interface INotificationProps {
  notification: INotification;
}

const Notification: React.FC<INotificationProps> = ({ notification }) => {
  if (!notification) {
    return null;
  }

  const colorClasses: { [key: string]: string } = {
    error:
      "text-red-800 border-red-300 bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800",
    info: "text-blue-800 border-blue-300 bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800",
    default:
      "text-green-800 border-green-300 bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800",
  };

  return (
    <div
      className={`flex items-center px-4 mx-4 md:mx-32 lg:mx-48 mt-4 md:mt-4 p-4 rounded-lg ${colorClasses[notification.type] || colorClasses.default}`}
      role="alert"
    >
      <svg
        className="flex-shrink-0 w-4 h-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>

      <span className="sr-only">
        {notification.type[0].toUpperCase() + notification.type.slice(1)}
      </span>

      <div className="ms-3 font-medium">{notification.message}</div>
    </div>
  );
};

export default Notification;
