import styles from '../../styles/Sng.module.css';
import { useEffect, useState, useCallback, use } from 'react';
import io, { Socket } from 'socket.io-client';
import PlayerInfoCard from '@/components/playerInfoCard';
import { RoomStatus, PlayerStatus } from '../../games/base/terms';

import * as Msg from '../../types/messages';
import { info } from 'console';

// The client socket must be declared outside of the component.
let socket: Socket;

export default function Poker() {
  const [playerId, setPlayerId] = useState(-1);
  const [currentRoomStatus, setCurrentRoomStatus] = useState(RoomStatus.NONE);

  // For more details on how to use useState with arrays, see: https://react.dev/learn/updating-arrays-in-state

  // players' name
  const [names, setNames] = useState(Array(9).fill(''));
  const setName = useCallback((id: number, newName: string) => {
    setNames((prevNames) => {
      return prevNames.map((name, index) => {
        if (index === id) {
          return newName;
        } else {
          return name;
        }
      });
    });
  }, []);

  // players' current chip
  const [currentChips, setCurrentChips] = useState(Array(9).fill(0));
  const setCurrentChip = useCallback((id: number, currentChip: number) => {
    setCurrentChips((prevCurrentChips) => {
      const newCurrentChips = [...prevCurrentChips];
      newCurrentChips[id] = currentChip;
      return newCurrentChips;
    });
  }, []);

  // players' current bet size
  const [currentBetSizes, setCurrentBetSizes] = useState(Array(9).fill(0));
  const setCurrentBetSize = useCallback((id: number, currentBetSize: number) => {
    setCurrentBetSizes((prevCurrentBetSizes) => {
      const newCurrentBetSizes = [...prevCurrentBetSizes];
      newCurrentBetSizes[id] = currentBetSize;
      return newCurrentBetSizes;
    });
  }, []);

  // players' current status
  const [currentPlayerStatuses, setCurrentPlayerStatuses] = useState(Array(9).fill(null));
  const setCurrentPlayerStatus = useCallback((id: number, currentPlayerStatus: PlayerStatus | null) => {
    setCurrentPlayerStatuses((prevCurrentPlayerStatuses) => {
      const newCurrentPlayerStatuses = [...prevCurrentPlayerStatuses];
      newCurrentPlayerStatuses[id] = currentPlayerStatus;
      return newCurrentPlayerStatuses;
    });
  }, []);

  const resetPlayerInfo = (id: number) => {
    setName(id, '');
    setCurrentChip(id, 0);
    setCurrentBetSize(id, 0);
    setCurrentPlayerStatus(id, null);
  }

  const loadRoomInfo = (info: Msg.LoadRoomInfoResponse) => {
    setCurrentRoomStatus(info.currentRoomStatus);
    setNames(info.names);
    setCurrentChips(info.currentChips);
    setCurrentBetSizes(info.currentBetSizes);
    setCurrentPlayerStatuses(info.currentPlayerStatuses);
  }

  // let socket = io(); <- Not good practice to create socket in render, since every render will create a new socket
  // socket.emit(socketEvent.XXX, 0); <- This will cause infinite loop.

  useEffect(() => {
    console.log("Connecting to socket...");
    fetch("../api/sockets/sngSocket").finally(() => {
      if (socket) {
        console.log("Socket exists. Socket id: " + socket.id);
      } else {
        socket = io();
        console.log("Socket created. Socket id: " + socket.id);

        // Add event listeners before attempting to connect.
        socket.on("connect", () => { // default connect event
          console.log(socket.id + " connected.");
        });

        socket.on("loadRoomInfoResponse", (response: Msg.LoadRoomInfoResponse) => {
          console.log("Loading room info. Curret room status: " + JSON.stringify(response));
          loadRoomInfo(response);
        });

        socket.on("StandupBroadcast", (broadcast: Msg.StandupBroadcast) => {
          console.log(broadcast.id + " stood up.");
          resetPlayerInfo(broadcast.id);
        });

        socket.on("SignupResponse", (response: Msg.SignupResponse) => {
          console.log("Successfully signed up at seat " + response.id + ".");
          setPlayerId(response.id);
        });

        socket.on("SignupBroadcast", (broadcast: Msg.SignupBroadcast) => {
          console.log("Player " +  broadcast.name + " signed up at seat " + broadcast.id + ".");
          setName(broadcast.id, broadcast.name);
          setCurrentPlayerStatus(broadcast.id, PlayerStatus.NONE);
        });
      }

      // load room info every time the component mounts
      socket.emit("loadRoomInfoRequest");
    });
  
    return () => {
      // do something when component unmounts
    }
  }, []);

  // const myFunction = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   const form = event.target as HTMLFormElement; // Cast event.target to HTMLFormElement
  //   const input = form.elements.namedItem('number') as HTMLInputElement;

  //   socket.emit(socketEvent.update_server_number, Number(input.value));
  // }

  // The socket is created in useEffect, which is called after the first render.
  const getSockets = (): Socket => {
    return socket;
  }

  return (
    <>
      <div className={styles.main}>
        <div className={styles.first_row}>
          <PlayerInfoCard
            socket={getSockets}
            id={0}
            name={names[0]}
            currentChip={currentChips[0]}
            currentBetSize={currentBetSizes[0]}
            currentPlayerStatus={currentPlayerStatuses[0]}
            currentRoomStatus={currentRoomStatus}
            playerId={playerId}
          />
          <PlayerInfoCard
            socket={getSockets}
            id={1}
            name={names[1]}
            currentChip={currentChips[1]}
            currentBetSize={currentBetSizes[1]}
            currentPlayerStatus={currentPlayerStatuses[1]}
            currentRoomStatus={currentRoomStatus}
            playerId={playerId}
          />
          <PlayerInfoCard
            socket={getSockets}
            id={2}
            name={names[2]}
            currentChip={currentChips[2]}
            currentBetSize={currentBetSizes[2]}
            currentPlayerStatus={currentPlayerStatuses[2]}
            currentRoomStatus={currentRoomStatus}
            playerId={playerId}
          />
          <PlayerInfoCard
            socket={getSockets}
            id={3}
            name={names[3]}
            currentChip={currentChips[3]}
            currentBetSize={currentBetSizes[3]}
            currentPlayerStatus={currentPlayerStatuses[3]}
            currentRoomStatus={currentRoomStatus}
            playerId={playerId}
          />
        </div>
        <div className={styles.second_row}>
          <PlayerInfoCard
            socket={getSockets}
            id={8}
            name={names[8]}
            currentChip={currentChips[8]}
            currentBetSize={currentBetSizes[8]}
            currentPlayerStatus={currentPlayerStatuses[8]}
            currentRoomStatus={currentRoomStatus}
            playerId={playerId}
          />
          <button>1</button>
          <PlayerInfoCard
            socket={getSockets}
            id={4}
            name={names[4]}
            currentChip={currentChips[4]}
            currentBetSize={currentBetSizes[4]}
            currentPlayerStatus={currentPlayerStatuses[4]}
            currentRoomStatus={currentRoomStatus}
            playerId={playerId}
          />
        </div>
        <div className={styles.third_row}>
          <PlayerInfoCard
            socket={getSockets}
            id={7}
            name={names[7]}
            currentChip={currentChips[7]}
            currentBetSize={currentBetSizes[7]}
            currentPlayerStatus={currentPlayerStatuses[7]}
            currentRoomStatus={currentRoomStatus}
            playerId={playerId}
          />
          <PlayerInfoCard
            socket={getSockets}
            id={6}
            name={names[6]}
            currentChip={currentChips[6]}
            currentBetSize={currentBetSizes[6]}
            currentPlayerStatus={currentPlayerStatuses[6]}
            currentRoomStatus={currentRoomStatus}
            playerId={playerId}
          />
          <PlayerInfoCard
            socket={getSockets}
            id={5}
            name={names[5]}
            currentChip={currentChips[5]}
            currentBetSize={currentBetSizes[5]}
            currentPlayerStatus={currentPlayerStatuses[5]}
            currentRoomStatus={currentRoomStatus}
            playerId={playerId}
          />
        </div>
      </div>
    </>
  )
}
