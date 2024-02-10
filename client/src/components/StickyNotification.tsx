import { INotification } from "../types/notification";

interface INotificationProps {
  notification: INotification;
}

const Notification: React.FC<INotificationProps> = ({ notification }) => {
  if (!notification) {
    return null;
  }

  let color: string = "green";

  if (notification.type === "error") {
    color = "red";
  } else if (notification.type === "info") {
    color = "blue";
  }

  return (
    <div
      className={`flex items-center px-4 mx-4 md:mx-32 lg:mx-16 xl:mx-5 p-4 text-${color}-800 border border-${color}-300 rounded-lg bg-${color}-50 dark:bg-gray-800 dark:text-${color}-400 dark:border-${color}-800`}
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
