// services/redis.js — mock for now
const store = {};

export default {
    hSet: async (key, field, value) => { 
        store[key] = { ...store[key], [field]: value }; 
    },
    hGet: async (key, field) => store[key]?.[field] ?? null,
    sIsMember: async (key, val) => store[key]?.has?.(val) ?? false,
    sAdd: async (key, val) => { store[key] = store[key] || new Set(); store[key].add(val); },
    lLen: async (key) => store[key]?.length ?? 0,
    lPop: async (key) => store[key]?.shift() ?? null,
    rPush: async (key, val) => { store[key] = store[key] || []; store[key].push(val); },
};