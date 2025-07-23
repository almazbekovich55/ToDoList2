import Editor from "@monaco-editor/react";
import { useState } from "react";

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const runCode = () => {
    try {
      // Эң жөнөкөй js eval (коопсуздук үчүн production'до колдонбо)
      const result = eval(code);
      setOutput(result === undefined ? "undefined" : result.toString());
    } catch (err) {
      setOutput(err.message);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ height: "400px" }}>
        <Editor
          height="100%"
          defaultLanguage="javascript"
          value={code}
          onChange={(value) => setCode(value)}
          theme="vs-dark"
        />
      </div>
      <button onClick={runCode} style={{ marginTop: "10px" }}>
        Run
      </button>
      <pre
        style={{
          background: "#f9f9f9",
          padding: "10px",
          marginTop: "10px",
          border: "1px solid #ccc",
        }}
      >
        {output}
      </pre>
    </div>
  );
};

export default CodeEditor;
