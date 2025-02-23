import { FaCheckCircle } from "react-icons/fa";

const ResetContent = () => {
  return {
    icon: <FaCheckCircle className="text-green-500 text-6xl mb-4" />,
    title: "E-mail envoyé avec succès",
    description: "Un e-mail de réinitialisation du mot de passe a été envoyé. Veuillez vérifier votre boîte de réception et suivre les instructions.",
  };
};

export default ResetContent;