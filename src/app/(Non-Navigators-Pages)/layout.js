import { ReduxProvider } from "../redux/provider";

export default function TextCorrectionLayout({ children }) {
  return <ReduxProvider>{children}</ReduxProvider>;
}
