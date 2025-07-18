import axios from "axios";

function Card(props) {
  function handleClick(event) {
    const colorText = event.target.innerText;
    navigator.clipboard.writeText(colorText).then(() => {
      alert("Color copied to clipboard.");
    });
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-md mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Mood: <span className="text-indigo-700">{props.mood}</span>
      </h3>

      <div className="grid grid-cols-5 gap-2 h-30">
        {props.colors?.map((color, index) => (
          <button key={index} onClick={handleClick}>
            <div
              className="w-20 h-20 rounded-md flex items-center justify-center text-[13px] font-semibold text-white"
              style={{ backgroundColor: color }}
            >
              {color}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Card;
