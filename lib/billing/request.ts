export function getDeviceIdFromRequest(request: Request) {
  return request.headers.get("x-device-id")?.trim() ?? "";
}
