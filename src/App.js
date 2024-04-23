import { useState } from "react";
import "./index.css";

const initialFriends = [
  {
    id: 118836,
    name: "Niki",
    image:
      "https://scontent.cdninstagram.com/v/t51.2885-19/313944671_197661606000715_6077547968209376742_n.jpg?stp=dst-jpg_s120x120&_nc_cat=105&ccb=1-7&_nc_sid=3fd06f&_nc_aid=0&_nc_ohc=WI6taiF_HDYAb6Qz-fL&_nc_ht=scontent.cdninstagram.com&oh=00_AfDd6OISEAKSFziNOeAOp9oOzE0asScKxitbrg_Uh0elgg&oe=6625D0AF",
    balance: 0,
  },
  {
    id: 933372,
    name: "Martina",
    image:
      "https://scontent.cdninstagram.com/v/t51.2885-19/395420813_291312197202937_7708697304184739716_n.jpg?stp=dst-jpg_s120x120&_nc_cat=108&ccb=1-7&_nc_sid=3fd06f&_nc_ohc=DfPPXyYZL8AAb64ezE1&_nc_oc=AdjV0niQW66nyHI7iZo7xAAJ_lSo8XEh_HU4TBQLXO24BXxzeH9nEjIRgiX7E--7LWU&_nc_ht=scontent.cdninstagram.com&oh=00_AfCIpHJXNkGvoqPVAQ2CbUPXQU2u0P9MGPJlVO2exoSmZA&oe=6625B1D5",
    balance: 0,
  },
  {
    id: 500476,
    name: "Nevena",
    image:
      "https://scontent.cdninstagram.com/v/t51.2885-19/43661784_193068981513544_9167238974664605696_n.jpg?stp=dst-jpg_s120x120&_nc_cat=109&ccb=1-7&_nc_sid=3fd06f&_nc_ohc=5Tq_Au5FSCkAb4rV0wH&_nc_ht=scontent.cdninstagram.com&oh=00_AfAliU5oHCS3DB_uwp5Sa8BYk_kf6PnbX4tXLxojqf_PKw&oe=6625A986",
    balance: 0,
  },
  {
    id: 499576,
    name: "Dakica",
    image:
      "https://scontent.cdninstagram.com/v/t51.2885-19/395420813_291312197202937_7708697304184739716_n.jpg?stp=dst-jpg_s120x120&_nc_cat=108&ccb=1-7&_nc_sid=3fd06f&_nc_ohc=DfPPXyYZL8AAb64ezE1&_nc_oc=AdjV0niQW66nyHI7iZo7xAAJ_lSo8XEh_HU4TBQLXO24BXxzeH9nEjIRgiX7E--7LWU&_nc_ht=scontent.cdninstagram.com&oh=00_AfCIpHJXNkGvoqPVAQ2CbUPXQU2u0P9MGPJlVO2exoSmZA&oe=6625B1D5",
    balance: -2000,
  },
  // {
  //   id: 777777,
  //   name: "Zika",
  //   image:
  //     "https://scontent.cdninstagram.com/v/t51.2885-19/246447143_395020645324680_7353690173487856866_n.jpg?stp=dst-jpg_s120x120&_nc_cat=103&ccb=1-7&_nc_sid=3fd06f&_nc_ohc=9QloEhQXdKsAb63zO81&_nc_ht=scontent.cdninstagram.com&oh=00_AfBSOgrWI876np5ezOVr4HL-bRkwZnf00OvGjU4NhwIgtQ&oe=6625C376",
  //   balance: 1000,
  // },
];

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend) {
    //setSelectedFriend(friend);
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    //console.log(value);

    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />

        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>

      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
}

function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <div>
      <ul>
        {friends.map((friend) => (
          <Friend
            friend={friend}
            key={friend.id}
            onSelection={onSelection}
            selectedFriend={selectedFriend}
          />
        ))}
      </ul>
    </div>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <div>
      <li className={isSelected ? "selected" : ""}>
        <img src={friend.image} alt={friend.name}></img>
        <h3>{friend.name}</h3>

        {friend.balance < 0 && (
          <p className="red">
            You owe your {friend.name} {Math.abs(friend.balance)}€
          </p>
        )}
        {friend.balance > 0 && (
          <p className="green">
            Your friend {friend.name} owes you {Math.abs(friend.balance)}€
          </p>
        )}
        {friend.balance === 0 && <p>You and {friend.name} are even</p>}
        <Button onClick={() => onSelection(friend)}>
          {isSelected ? "Close" : "Select"}
        </Button>
      </li>
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState(
    "https://scontent.cdninstagram.com/v/t51.2885-19/246447143_395020645324680_7353690173487856866_n.jpg?stp=dst-jpg_s120x120&_nc_cat=103&ccb=1-7&_nc_sid=3fd06f&_nc_ohc=9QloEhQXdKsAb63zO81&_nc_ht=scontent.cdninstagram.com&oh=00_AfBSOgrWI876np5ezOVr4HL-bRkwZnf00OvGjU4NhwIgtQ&oe=6625C376"
  );

  function handleSubmit(e) {
    e.preventDefault();
    const id = crypto.randomUUID();

    if (!name || !image) return;

    const newFriend = {
      id,
      name,
      image,
      balance: 0,
    };

    onAddFriend(newFriend);
    setName("");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <label>Image URL</label>

      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      ></input>
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPayByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      ></input>

      <label>Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPayByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      ></input>

      <label>{selectedFriend.name} expense</label>
      <input type="text" disabled value={paidByFriend}></input>

      <label>Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option>{selectedFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
