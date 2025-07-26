### Credentials

## Login Credentials
- navigate through http://frontend_domain/admin to access protected routes(middlwware.ts for details)
- email: admin@example.com
- password: admin123



### Features

## Admin 
- Credentials: validate the credentials and generate token(with expiry of 1 hour) and stores in cookies
- Create update delete the travel packages
- IMage can be added by pasting Image Link
- React Date Picker is used to render and select dates(past dates are avioded)
- Packages and Orders(including states) are stored in localstorage by using Zustand(presist)
- Orders details are listed(orders are retrieved using Zustand store)
- Middleware handles the protected routes: /admin/:*

## User 
- Packages created by Admin are rendered in cards
- User Selects and Book that Opens Modal fill form and The booking is stored in localstorage using Zustand(persist)

### Insights 
- Real Date Picker, Toast messages, Booking Experience, Simulating Auth validation: fake token generation, 1 hour expiry in token, UUID for packages and Bookings Schemas, Modals, Skeleton Loading are considered as per the requirement
