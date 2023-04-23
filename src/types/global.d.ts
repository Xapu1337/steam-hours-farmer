
//#region "General Interfaces"
import SteamUser from "steam-user";
import SteamID from "steamid";

interface Options {
    localPort?: number | null;
    protocol?: SteamUser.EConnectionProtocol;
    httpProxy?: string | null;
    localAddress?: string | null;
    autoRelogin?: boolean;
    singleSentryfile?: boolean;
    machineIdType?: SteamUser.EMachineIDType;
    machineIdFormat?: [string, string, string];
    enablePicsCache?: boolean;
    language?: string;
    picsCacheAll?: boolean;
    changelistUpdateInterval?: number;
    saveAppTickets?: boolean;
    additionalHeaders?: Record<string, string>;
    webCompatibilityMode?: boolean;
}

interface Events {
    appLaunched: [appid: number];
    appQuit: [appid: number];
    receivedFromGC: [appid: number, msgType: number, payload: Buffer];
    loggedOn: [details: Record<string, any>, parental: Record<string, any>];
    steamGuard: [domain: string | null, callback: (code: string) => void, lastCodeWrong: boolean];
    error: [err: Error & { eresult: SteamUser.EResult }];
    disconnected: [eresult: SteamUser.EResult, msg?: string];
    sentry: [sentry: Buffer];
    webSession: [sessionID: string, cookies: string[]];
    loginKey: [key: string];
    newItems: [count: number];
    newComments: [count: number, myItems: number, discussions: number];
    tradeOffers: [count: number];
    communityMessages: [count: number];
    offlineMessages: [count: number, friends: SteamID[]];
    vanityURL: [url: string];
    accountInfo: [name: string, country: string, authedMachines: number, flags: SteamUser.EAccountFlags, facebookID: string, facebookName: string];
    emailInfo: [adress: string, validated: boolean];
    accountLimitations: [limited: boolean, communityBanned: boolean, locked: boolean, canInviteFriends: boolean];
    vacBans: [numBans: number, appids: number[]];
    wallet: [hasWallet: boolean, currency: SteamUser.ECurrencyCode, balance: number];
    licenses: [licenses: Array<Record<string, any>>];
    gifts: [gifts: Gift[]];
    ownershipCached: [];
    changelist: [changenumber: number, apps: number[], packages: number[]];
    appUpdate: [appid: number, data: ProductInfo];
    packageUpdate: [appid: number, data: ProductInfo];
    marketingMessages: [timestamp: Date, messages: Array<{ id: string; url: string; flags: number }>];
    tradeRequest: [steamID: SteamID, respond: (accept: boolean) => void];
    tradeResponse: [steamID: SteamID, response: SteamUser.EEconTradeResponse, restrictions: TradeRestrictions];
    tradeStarted: [steamID: SteamID];
    playingState: [blocked: boolean, playingApp: number];
    user: [sid: SteamID, user: Record<string, any>];
    group: [sid: SteamID, group: Record<string, any>];
    groupEvent: [sid: SteamID, headline: string, date: Date, gid: number | string, gameID: number]; // not sure
    groupAnnouncement: [sid: SteamID, headline: string, gid: number | string]; // not sure
    friendRelationship: [sid: SteamID, relationship: SteamUser.EFriendRelationship];
    groupRelationship: [sid: SteamID, relationship: SteamUser.EClanRelationship];
    friendsList: [];
    friendPersonasLoad: [];
    groupList: [];
    friendsGroupList: [groups: Record<string, { name: string; members: SteamID[] }>];
    nicknameList: [];
    nickname: [steamID: SteamID, newNickname: string | null];
    lobbyInvite: [inviterID: SteamID, lobbyID: SteamID];
}


//#region "Events"
interface ChatEvents {
    friendMessage: [message: IncomingFriendMessage];
    friendMessageEcho: [message: IncomingFriendMessage];
    friendTyping: [message: IncomingFriendMessage];
    friendTypingEcho: [message: IncomingFriendMessage];
    friendLeftConversation: [message: IncomingFriendMessage];
    friendLeftConversationEcho: [message: IncomingFriendMessage];
    chatMessage: [message: IncomingChatMessage];
    chatMessagesModified: [details: ModifiedMessage[]];
}
//#endregion "Events"

//#region "Response Interfaces"
interface ChatMessage {
    sender: SteamID;
    server_timestamp: Date;
    ordinal: number;
    message: string;
    server_message: ServerMessage;
    deleted: boolean;
}

interface FriendMessage {
    sender: SteamID;
    server_timestamp: Date;
    ordinal: number;
    message: string;
    message_bbcode_parsed: null | Array<string | Record<string, any>>;
}

interface ActiveFriendMessageSession {
    steamid_friend: SteamID;
    time_last_message: Date;
    time_last_view: Date;
    unread_message_count: number;
}

interface Ban {
    steamid: SteamID;
    steamid_actor: SteamID;
    time_banned: Date;
    ban_reason: ''; // always empty, SteamUI doesn't support ban reasons
}

interface SentMessage {
    modified_message: string;
    server_timestamp: Date;
    ordinal: number;
}

interface GroupInviteLinks {
    invite_code: string;
    invite_url: string;
    steamid_creator: SteamID;
    time_expires: Date | null;
    chat_id: string;
}

interface InviteLinkInfo {
    invite_code: string;
    steamid_sender: SteamID;
    time_expires: Date | null;
    group_summary: ChatRoomGroupSummary;
    time_kick_expire: Date | null;
    banned: boolean;
}
//#endregion "Response Interfaces"

//#region "Interfaces"
interface ModifiedMessage {
    chat_group_id: string;
    chat_id: string;
    messages: {
        server_timestamp: Date;
        ordinal: number;
        deleted: boolean;
    };
}

interface MessageToDelete1 {
    server_timestamp: Date;
    ordinal?: number;
}

interface MessageToDelete2 {
    timestamp: Date;
    ordinal?: number;
}

interface GetMessageHistoryOptions {
    maxCount?: number;
    wantBbcode?: boolean;
    startTime?: Date | number;
    startOrdinal?: number;
    lastTime?: Date | number;
    lastOrdinal?: number;
}

interface ServerMessage {
    message: SteamUser.EChatRoomServerMessage;
    string_param?: string;
    steamid_param?: SteamID;
}

interface ChatMentions {
    mention_all: boolean;
    mention_here: boolean;
    mention_steamids: SteamID[];
}

interface IncomingChatMessage {
    chat_group_id: string;
    chat_id: string;
    steamid_sender: SteamID;
    message: string;
    message_no_bbcode: string;
    server_timestamp: Date;
    ordinal: number;
    mentions: ChatMentions | null;
    server_message: ServerMessage | null;
    chat_name: string;
}

interface IncomingFriendMessage {
    steamid_friend: SteamID;
    chat_entry_type: SteamUser.EChatEntryType;
    from_limited_account: boolean;
    message: string;
    message_no_bbcode: string;
    message_bbcode_parsed: Array<string | Record<string, any>>;
    server_timestamp: Date;
    ordinal: number;
    local_echo: boolean;
    low_priority: boolean;
}

interface UserChatRoomState {
    chat_id: string;
    time_joined: Date;
    time_last_ack: Date | null;
    desktop_notification_level: SteamUser.EChatRoomNotificationLevel;
    mobile_notification_level: SteamUser.EChatRoomNotificationLevel;
    time_last_mention: Date | null;
    unread_indicator_muted: boolean;
    time_first_unread: Date;
}

interface UserChatRoomGroupState {
    chat_group_id: string;
    time_joined: Date;
    user_chat_room_state: UserChatRoomState[];
    desktop_notification_level: SteamUser.EChatRoomNotificationLevel;
    mobile_notification_level: SteamUser.EChatRoomNotificationLevel;
    time_last_group_ack: Date | null;
    unread_indicator_muted: boolean;
}

interface ChatRoleActions {
    role_id: string;
    can_create_rename_delete_channel: boolean;
    can_kick: boolean;
    can_ban: boolean;
    can_invite: boolean;
    can_change_tagline_avatar_name: boolean;
    can_chat: boolean;
    can_view_history: boolean;
    can_change_group_roles: boolean;
    can_change_user_roles: boolean;
    can_mention_all: boolean;
    can_set_watching_broadcast: boolean;
}

interface ChatRole {
    role_id: string;
    name: string;
    ordinal: number;
}

interface ChatRoomGroupHeaderState {
    chat_group_id: string;
    chat_name: string;
    clanid: SteamID | null;
    steamid_owner: SteamID;
    appid: number | null;
    tagline: string;
    avatar_sha: Buffer | null;
    avatar_url: string | null;
    default_role_id: string;
    roles: ChatRole[];
    role_actions: ChatRoleActions[];
    watching_broadcast_steamid?: SteamID | null; // not sure if optional or null
}

interface ChatRoomMember {
    steamid: SteamID;
    state: SteamUser.EChatRoomJoinState;
    rank: SteamUser.EChatRoomGroupRank;
    time_kick_expire: Date | null;
    role_ids: string[];
}

interface ChatRoomGroupState {
    members: ChatRoomMember[];
    chat_rooms: ChatRoomState[];
    kicked: ChatRoomMember[];
    default_chat_id: string;
    header_state: ChatRoomGroupHeaderState;
}

interface ChatRoomState {
    chat_id: string;
    chat_name: string;
    voice_allowed: boolean;
    members_in_voice: SteamID[];
    time_last_message: Date;
    sort_order: number;
    last_message: string;
    steamid_last_message: SteamID;
}

interface ChatRoomGroupSummary {
    chat_rooms: ChatRoomState[];
    top_members: SteamID[];
    chat_group_id: string;
    chat_group_name: string;
    active_member_count: number;
    active_voice_member_count: number;
    default_chat_id: string;
    chat_group_tagline: string;
    appid: number | null;
    steamid_owner: SteamID;
    watching_broadcast_steamid?: SteamID | null; // not sure if optional or null
    chat_group_avatar_sha: Buffer | null;
    chat_group_avatar_url: string | null;
}

interface ChatRoomGroup {
    group_summary: ChatRoomGroupSummary;
}
