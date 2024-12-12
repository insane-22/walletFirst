import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner"
import Navbar from "./components/Navbar";
import { Separator } from "./components/ui/separator";
import GenerateSecret from "./components/GenerateSecret";

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="max-w-7xl mx-auto flex flex-col gap-4 p-4 min-h-[92vh]">
        <Toaster/>
        <Navbar />
        <Separator/>
        <GenerateSecret/>
      </main>
    </ThemeProvider>
  );
}

export default App;
