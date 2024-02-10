import { useAppDispatch, useAppSelector } from "../hooks";
import { setNotification } from "../reducers/notificationReducer";
import { IRootState } from "../store";

const Notification = () => {
  const dispatch = useAppDispatch();

  const notification = useAppSelector(
    (state: IRootState) => state.notification,
  );

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
      className={`flex items-center px-4 mx-4 md:mx-32 lg:mx-48 mt-4 md:mt-4 p-4 text-${color}-800 border border-${color}-300 rounded-lg bg-${color}-50 dark:bg-gray-800 dark:text-${color}-400 dark:border-${color}-800`}
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

      <button
        type="button"
        className={`ms-auto -mx-1.5 -my-1.5 bg-${color}-50 text-${color}-500 rounded-lg focus:ring-2 focus:ring-${color}-400 p-1.5 hover:bg-${color}-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-${color}-400 dark:hover:bg-gray-700`}
        data-dismiss-target="#alert-1"
        aria-label="Close"
        onClick={() => {
          dispatch(setNotification(null));
        }}
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
};

export default Notification;
