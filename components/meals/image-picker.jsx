"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import styles from "./image-picker.module.css";

export default function ImagePicker({ label, name }) {
  const [image, setImage] = useState();
  const imageInput = useRef();

  function handleImagePicker() {
    imageInput.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      setImage(null);
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  }

  return (
    <div className={styles.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.controls}>
        <div className={styles.preview}>
          {!image && <p>No image picked yet.</p>}
          {image && <Image src={image} alt="Preview" fill />}
        </div>
        <input
          className={styles.input}
          type="file"
          id={name}
          name={name}
          accept=".jpg,.png,.jpeg"
          ref={imageInput}
          onChange={handleImageChange}
          required
        />
        <button
          className={styles.button}
          type="button"
          onClick={handleImagePicker}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
