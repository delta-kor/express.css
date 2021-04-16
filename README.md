# express.css

A express server powered by css

## Examples

### Server configuring

```css
server {
  port: 3000;
}
```

### Routing

```css
/* GET / */
route {
  message: 'Server running!';
}

/* GET /status */
route.status {
  message: 'Server status';
}

/* GET /status/me */
route.status.me {
  message: 'My status';
}

/* POST /user */
route.user::post {
  message: 'User page';
}
```
