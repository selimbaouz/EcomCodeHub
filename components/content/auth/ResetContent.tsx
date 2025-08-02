import { FaCheckCircle } from "react-icons/fa";

const ResetContent = (t: (key: string) => string) => {
  return {
    icon: <FaCheckCircle className="text-green-500 text-6xl mb-4" />,
    title: t("content.emailSentTitle"),
    description: t("content.emailSentDescription"),
  };
};

export default ResetContent;
