import { Dialog } from '@headlessui/react';
import React from 'react';
import { AppContext } from '../context/AppContext';

function JsonDialog() {
  const {
    jsonDialogData,
    setJsonDialogData,
  } = React.useContext(AppContext);

  return (
    <Dialog
      open={jsonDialogData.state}
      onClose={() => setJsonDialogData({ state: false, data: null })}
      className="fixed overflow-hidden"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed  p-4 max-w-2xl inset-y-0 right-0 bg-white overflow-y-auto">
        <Dialog.Panel>
          <div className="px-4 sm:px-6 flex-row flex justify-between">
            <Dialog.Title className="text-xl font-medium text-gray-900 mt-4">
              Raw JSON
            </Dialog.Title>
            <button
              type="button"
              onClick={() => setJsonDialogData({ state: false, data: null })}
              data-cy="closeButton"
            >
              Close
            </button>
          </div>
          <pre
            id="json"
            className="h-full border-2 border-dashed border-gray-200 w-fit m-2 p-2"
          >
            {jsonDialogData.data}
          </pre>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default JsonDialog;
