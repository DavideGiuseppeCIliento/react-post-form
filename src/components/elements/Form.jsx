import { useState, useEffect } from "react";
import axios from "axios";

const urlApi = "https://67c5b4f3351c081993fb1ab6.mockapi.io/api/posts";

const inizializedPost = {
  author: "",
  title: "",
  body: "",
  public: false,
};

export default function Form() {
  const [dataForm, setDataForm] = useState(inizializedPost);
  console.log(dataForm);

  // ## FUNZIONE ACQUISIZIONE DATI DAL FORM
  const HandleDataForm = (e) => {
    const { name, type, value, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setDataForm({
      ...dataForm,
      [name]: newValue,
    });
  };

  // ## FUNZIONE INVIO FORM
  const HandleFormSubmit = (e) => {
    e.disable.default();
    apiRequest();
  };

  // --- CHIAMATA API
  const apiRequest = () => {
    axios
      .post(urlApi, dataForm)
      .then((res) => {
        console.log("Dati inviati con successo:", res.data);
      })
      .catch((err) => {
        console.error("Errore durante l'invio:", err);
      });
  };

  // # RENDER
  return (
    <form
      className="container bordo-soft text-white mt-5 p-5"
      onSubmit={HandleFormSubmit}
    >
      <div className="mb-3">
        <label htmlFor="author" className="form-label">
          Author
        </label>
        <input
          type="text"
          className="form-control"
          id="author"
          name="author"
          placeholder="Enter author name"
          value={dataForm.author}
          onChange={HandleDataForm}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          placeholder="Enter post title"
          value={dataForm.title}
          onChange={HandleDataForm}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          Body
        </label>
        <textarea
          className="form-control"
          id="body"
          name="body"
          rows="5"
          placeholder="Write your content here..."
          value={dataForm.body}
          onChange={HandleDataForm}
        ></textarea>
      </div>

      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="public"
          name="public"
          checked={dataForm.public}
          onChange={HandleDataForm}
        />
        <label className="form-check-label" htmlFor="public" required>
          Public
        </label>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
