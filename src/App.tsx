import { useEffect, useRef, useState } from "react";
import "./App.css";
import { IconButton } from "./components/Buttons/IconButton";
import Icon from "./components/icon/Icon";
import { data, dishStructure } from "./data";

function App() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredData, setFilteredData] = useState<dishStructure[]>([]);
  const [dishId, setDishId] = useState<number>(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const [focus, setFocus] = useState<boolean>(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFocus(true);
    const input = event.target.value;
    const filtered = data.filter((user) =>
      user.name.toLowerCase().includes(input.toLowerCase())
    );
    setSearchInput(input);
    setFilteredData(filtered);
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  const handleDocumentClick = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setFocus(false);
    }
  };

  const selectDish = (id: number) => {
    setDishId(id);
    setSearchInput(data[id].name);
  };

  return (
    <div className="board">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          value={searchInput}
          onChange={handleSearch}
          placeholder="Search cousine"
          ref={inputRef}
        />
        {focus && (
          <div className="search-item">
            {filteredData.map((user) => (
              <div key={user.id} onClick={() => selectDish(user.id)}>
                <p>{user.name}</p>
              </div>
            ))}
          </div>
        )}
        <div className="search-icon">
          <Icon size={20} viewBox="0 0 20 20" name="Search" />
        </div>
      </div>
      {/* Dish & Link */}
      <div className="dish">
        <div className="dish-name">
          <Icon size={24} viewBox="0 0 24 24" name="Spain" />
          <h1>{data[dishId].name}</h1>
        </div>
        <div className="link">
          <IconButton name="Twitter" size={10} viewBox="0 0 10 10" />
          <IconButton name="Telegram" size={10} viewBox="0 0 10 10" />
          <IconButton name="Medium" size={10} viewBox="0 0 10 10" />
          <IconButton name="Language" size={10} viewBox="0 0 10 10" />
        </div>
      </div>
      {/* Cooking Method */}
      <div className="method">
        <div className="body">
          <div className="title">
            <Icon name="Paella" size={32} viewBox="0 0 32 32" />
            <h1>Difficulty: {data[dishId].level}</h1>
          </div>
          <h1 className="description">{data[dishId].method}</h1>
          <button>View Full Recipe</button>
        </div>
      </div>
      {/* Cooking Information */}
      <div className="info">
        <div className="card">
          <div className="descript">
            <h1 className="title">Seafood</h1>
            <h2 className="nomal">{data[dishId].seafood}</h2>
          </div>
          <div className="descript">
            <h1 className="title">Produce</h1>
            <div className="nomal flex-gap">
              <p className="green">{data[dishId].produce_1}</p>/
              <p className="red">{data[dishId].produce_2}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="descript">
            <h1 className="title">Spices</h1>
            <div className="nomal flex-gap">
              <p className="green">{data[dishId].spices_1}</p>/
              <p className="orange">{data[dishId].spices_2}</p>
            </div>
          </div>
          <div className="descript">
            <h1 className="title">Olive Oil</h1>
            <h2 className="orange">{data[dishId].oil}</h2>
          </div>
        </div>
        <div className="card">
          <div className="descript">
            <h1 className="title">Volume/Weight</h1>
            <h2 className="white">{data[dishId].weight}</h2>
          </div>
          <div className="descript">
            <h1 className="title">Serves</h1>
            <h2 className="white">{data[dishId].serves}</h2>
          </div>
        </div>
        <div className="card">
          <div className="descript">
            <h1 className="title">Authenticity</h1>
            <h2 className="orange">{data[dishId].authenticity}</h2>
          </div>
          <div className="descript">
            <h1 className="title">Stock</h1>
            <h2 className="orange">{data[dishId].stock}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
