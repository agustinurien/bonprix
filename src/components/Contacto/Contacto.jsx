import "../Contacto/contacto.css";

const Contacto = () => {
  const handlesubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    let sendEmail = "";

    const templateParams = {
      from_name: form.name.value,
      number: form.number.value,
      from_email: form.email.value,
      message: form.message.value,
      to_email: sendEmail,
      reply_to: form.email.value,
    };

    const serviceID = "";
    const templateID = "";
    const publicKey = "";

    emailjs.send(serviceID, templateID, templateParams, publicKey).then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );

    form.reset();
  };

  return (
    <section className="contactContainer" id="contacto">
      <div className="contact">
        <h2 className="contactTitle">Contacto</h2>
        <form onSubmit={handlesubmit}>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nombre"
            required
          />
          <input
            type="number"
            id="number"
            name="number"
            placeholder="Celular"
            required
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
          />
          <textarea
            type="text"
            id="message"
            name="message"
            placeholder="Mensaje"
            className="area"
            required
          />
          <button>Enviar</button>
        </form>
      </div>
    </section>
  );
};

export default Contacto;
