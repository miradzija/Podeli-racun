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
  const [friends, setFriends] = useState(initialFriends);

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />
        <FormAddFriend />
        <Button>Add friend</Button>
      </div>
    </div>
  );
}

function FriendsList({ friends }) {
  return (
    <div>
      <ul>
        {friends.map((friend) => (
          <Friend friend={friend} key={friend.id} />
        ))}
      </ul>
    </div>
  );
}

function Friend({ friend }) {
  return (
    <div>
      <li>
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
        <Button>Select</Button>
      </li>
    </div>
  );
}

function Button({ children }) {
  return <button className="button">{children}</button>;
}

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>Friend name</label>
      <input type="text"></input>
      <label>Image URL</label>

      <input></input>
      <Button>Add</Button>
    </form>
  );
}
