import "../Contacto/contacto.css";
import emailjs from "@emailjs/browser";

const Contacto = () => {
  const handlesubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const templateParams = {
      user_name: form.name.value,
      user_number: form.number.value,
      user_email: form.email.value,
      message: form.message.value,
      to_email: "Delivery@grupobonprix.com.ar",
      reply_to: form.email.value,
    };

    const serviceID = "service_8u3gvod";
    const templateID = "template_mjt7wjh";
    const publicKey = "iPIMjwtA0QQid3Dtk";

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
