"use client";
import { useState, useRef, useEffect } from "react";

const UploadForm: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (files.length > 0) {
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setPreviews(newPreviews);
      return () => {
        newPreviews.forEach((url) => URL.revokeObjectURL(url));
      };
    }
  }, [files]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (files.length === 0) {
      alert("Please select files before submitting");
      return;
    }
    try {
      const data = new FormData();
      files.forEach((file) => {
        data.append("files", file);
      });

      const res = await fetch("/api/uploads", {
        method: "POST",
        body: data,
      });
      if (!res.ok) throw new Error(await res.text());
      alert(`${files.length} file(s) uploaded successfully`);
      setFiles([]);
      setPreviews([]);
    } catch (e: any) {
      console.error(e);
      alert("Error uploading files");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="file"
        name="files"
        ref={fileInputRef}
        onChange={(e) => setFiles(Array.from(e.target.files || []))}
        style={{ display: "none" }}
        multiple
      />
      <button
        className="btn btn-primary m-3"
        type="button"
        onClick={() => fileInputRef.current?.click()}
      >
        Select Files
      </button>
      {files.length > 0 && (
        <div>
          <p>{files.length} files selected:</p>
          <ul style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {previews.map((preview, index) => (
              <li key={index} style={{ listStyle: "none" }}>
                <img
                  src={preview}
                  alt={`preview ${index}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="btn btn-primary">
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
};

export default UploadForm;
