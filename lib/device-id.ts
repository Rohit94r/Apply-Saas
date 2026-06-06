"use client";

const DEVICE_STORAGE_KEY = "apply_device_id";

export function getOrCreateDeviceId() {
  if (typeof window === "undefined") {
    return "";
  }

  const existing = window.localStorage.getItem(DEVICE_STORAGE_KEY);

  if (existing) {
    return existing;
  }

  const deviceId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `device-${Date.now()}-${Math.random().toString(36).slice(2)}`;

  window.localStorage.setItem(DEVICE_STORAGE_KEY, deviceId);
  return deviceId;
}

export function billingRequestHeaders() {
  const deviceId = getOrCreateDeviceId();

  return {
    "Content-Type": "application/json",
    "X-Device-Id": deviceId
  };
}
