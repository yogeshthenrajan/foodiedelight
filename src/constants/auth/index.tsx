export const moduleKeys: Record<string, string> = {
    'dashboard': 'dashboard',
    'profile': 'profile',
    'restuarants': 'restuarants',
    "restuarants-create": "restuarants-create",
    "restuarants-edit": "restuarants-edit",
    "restuarants-list": "restuarants-list"
}

export const requiredPermissions: Record<string, Array<string>> = {
    [moduleKeys.dashboard]: [`dashboard`],
    [moduleKeys.profile]: [`profile`],
    [moduleKeys.restuarants]: [`restuarants`],
    [moduleKeys["restuarants-create"]]: [
        `restuarants`,
        `restuarants:create`,
    ],
    [moduleKeys["restuarants-edit"]]: [
        `restuarants`,
        `restuarants:edit`,
    ],
    [moduleKeys["restuarants-list"]]: [
        `restuarants`,
        `restuarants:list`,
    ]
}