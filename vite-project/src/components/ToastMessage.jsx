function ToastMessage({ showToast, toastMessage }) {
  if (!showToast) return null;

  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-red-400 text-white py-2 px-4 rounded-md shadow-md transition-opacity duration-500">
      {toastMessage}
    </div>
  );
}

export default ToastMessage;
