import { type } from "os";


interface GrantList {
    role: string;
    resource: string;
    action: string;
    [key: string]: any;
}


const grantList: GrantList[] = [
    { role: 'admin', resource: 'all', action: 'create:any' },

    { role: 'user_create', resource: 'user', action: 'create:any' },
    { role: 'user_read', resource: 'user', action: 'read:any' },
    { role: 'user_delete', resource: 'user', action: 'delete:any' },
    { role: 'user_update', resource: 'user', action: 'update:any' },


    { role: 'whatsapp_create', resource: 'chat', action: 'create:any', attributes: '*' },
    { role: 'whatsapp_read', resource: 'chat', action: 'read:any', attributes: '*' },
    { role: 'whatsapp_delete', resource: 'chat', action: 'delete:any', attributes: '*' },

    { role: 'instagram_create', resource: 'chat', action: 'create:any', attributes: '*' },
    { role: 'instagram_read', resource: 'chat', action: 'read:any', attributes: '*' },
    { role: 'instagram_delete', resource: 'chat', action: 'delete:any', attributes: '*' },

    { role: 'facebook_create', resource: 'chat', action: 'create:any', attributes: '*' },
    { role: 'facebook_read', resource: 'chat', action: 'read:any', attributes: '*' },
    { role: 'facebook_delete', resource: 'chat', action: 'delete:any', attributes: '*' },

    { role: 'outlook_create', resource: 'chat', action: 'create:any', attributes: '*' },
    { role: 'outlook_read', resource: 'chat', action: 'read:any', attributes: '*' },
    { role: 'outlook_delete', resource: 'chat', action: 'delete:any', attributes: '*' },

    { role: 'gmail_create', resource: 'chat', action: 'create:any', attributes: '*' },
    { role: 'gmail_read', resource: 'chat', action: 'read:any', attributes: '*' },
    { role: 'gmail_delete', resource: 'chat', action: 'delete:any', attributes: '*' },

    { role: 'microsoftTeams_create', resource: 'chat', action: 'create:any', attributes: '*' },
    { role: 'microsoftTeams_read', resource: 'chat', action: 'read:any', attributes: '*' },
    { role: 'microsoftTeams_delete', resource: 'chat', action: 'delete:any', attributes: '*' },

];

export default grantList;