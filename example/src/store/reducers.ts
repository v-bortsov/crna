export interface Message {
  user: string;
  message: string;
  timestamp: number;
}
export const UPDATE_SESSION = 'UPDATE_SESSION';
export interface ChatState {
  messages: Message[];
}
export interface SystemState {
  loggedIn: boolean;
  session: string;
  userName: string;
}
interface UpdateSessionAction {
  type: typeof UPDATE_SESSION;
  payload: SystemState;
}
export type SystemActionTypes = UpdateSessionAction;
const initialState: ChatState = {
  messages: [],
};
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';

interface SendMessageAction {
  type: typeof SEND_MESSAGE;
  payload: Message;
}

interface DeleteMessageAction {
  type: typeof DELETE_MESSAGE;
  meta: {
    timestamp: number;
  };
}

export type ChatActionTypes = SendMessageAction | DeleteMessageAction;
export function chatReducer(
  state = initialState,
  action: ChatActionTypes
): ChatState {
  switch (action.type) {
    case 'SEND_MESSAGE':
      return {
        messages: [...state.messages, action.payload],
      };
    case 'DELETE_MESSAGE':
      return {
        messages: state.messages.filter(
          (message) => message.timestamp !== action.meta.timestamp
        ),
      };
    default:
      return state;
  }
}
