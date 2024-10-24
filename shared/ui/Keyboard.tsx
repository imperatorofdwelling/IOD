import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';

const Keyboard = () => {
  const [input, setInput] = useState('');

  const keys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
  ];

  const handleKeyPress = (key) => {
    setInput((prev) => prev + key);
  };

  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  return (
    <div className="flex flex-col items-center">
      <Input
        clearable
        bordered
        fullWidth
        value={input}
        placeholder="Type here..."
        className="mb-4 w-[90%] md:w-[60%]"
        aria-label="Keyboard input"
      />

      <div className="flex flex-col space-y-3">
        {keys.map((row, rowIndex) => (
          <div key={rowIndex} className="flex space-x-2 justify-center">
            {row.map((key) => (
              <Button
                key={key}
                auto
                light
                onClick={() => handleKeyPress(key)}
                className="bg-gray-800 text-white w-10 h-10"
              >
                {key}
              </Button>
            ))}
          </div>
        ))}

        <div className="flex space-x-2 justify-center">
          <Button
            auto
            light
            onClick={() => handleDelete()}
            className="bg-gray-800 text-white w-10 h-10"
          >
            ⌫
          </Button>
          <Button
            auto
            light
            onClick={() => handleKeyPress(' ')}
            className="bg-gray-800 text-white w-24 h-10"
          >
            Space
          </Button>
          <Button
            auto
            light
            onClick={() => setInput('')}
            className="bg-gray-800 text-white w-10 h-10"
          >
            ↵
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Keyboard;
