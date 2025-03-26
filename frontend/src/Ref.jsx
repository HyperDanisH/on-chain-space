{!isAuthenticated ? (
    <div className="mt-4 rounded-md border-l-4 bg-neutral-200 p-4 shadow-md">
      <p className="mt-2 text-black">Please sign in to access the file vault.</p>
    </div>
  ) : (
    <div>
      <div className="mb-4">
        <input
          type="file"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {errorMessage && (
        <div className="mt-4 rounded-md border border-red-400 bg-red-100 p-3 text-red-700">{errorMessage}</div>
      )}

      {fileTransferProgress && (
        <div className="mb-4">
          <p className="mb-2 text-sm text-gray-600">
            {`${fileTransferProgress.mode} ${fileTransferProgress.fileName} ... ${fileTransferProgress.progress}%`}
          </p>
        </div>
      )}

      <div className="space-y-2">
        {files.length === 0 ? (
          <p className="py-8 text-center text-gray-500">You have no files. Upload some!</p>
        ) : (
          files.map((file) => (
            <div key={file.name} className="flex items-center justify-between rounded-lg bg-white p-3 shadow">
              <div className="flex items-center space-x-2">
                <span>{file.name}</span>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleFileDownload(file.name)} className="btn">
                  Download
                </button>
                <button onClick={() => handleFileDelete(file.name)} className="btn">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )}