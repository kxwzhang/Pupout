// function for ball trajectory 
function intercept(ax, ay, bx, by, cx, cy, dx, dy, label) {
    // let the denominator be the difference of products
    let denom = ((dy - cy) * (bx - ax)) - ((dx - cx) * (by - ay));
    // check to make sure there is no zero-division
    if (denom !== 0) {
        let divisionA = (((dx - cx) * (ay - cy) - (dy - cy) * (ax - cx))) / denom;
        if ((divisionA >= 0) && (divisionA <= 1)) {
            let divisionB = ((bx - ax) * (ay - cy) - (by - ay) * (ax - cx)) / denom;
            console.log('divisionB: ', divisionB);
            if ((divisionB >= 0) && (divisionB <= 1)) {
                console.log('divisionA: ', divisionA);
                let x = ax + (divisionA * (bx - ax));
                let y = ay + (divisionA * (by - ay));
                return { x: x, y: y, dir: label };
            }
        }
    }
    return null; // if zero-division were to happen
}

// function for checking interception of ball with paddle
function ballInterceptPaddle(ball) {
    let action;
    action = intercept(
        ball.x, 
        ball.y, 
        ball.y + ball.dy,
        paddle.x, 
        paddle.y - BALL_RADIUS,
        paddle.x + paddle.width,
        paddle.y - BALL_RADIUS,
        'TOP'
    );
    if (!action && ball.dx < 0) {
        action = intercept(
          ball.x,
          ball.y,
          ball.x + ball.dx,
          ball.y + ball.dy,
          paddle.x + paddle.width,
          paddle.y - BALL_RADIUS,
          paddle.x + paddle.with + BALL_RADIUS,
          paddle.y,
          'TOP_RIGHT'
        );
    }
    if (!action && ball.dx < 0) {
        action = intercept(
          ball.x,
          ball.y,
          ball.x + ball.dx,
          ball.y + ball.dy,
          paddle.x + paddle.width + BALL_RADIUS,
          paddle.y,
          paddle.x + paddle.width + BALL_RADIUS,
          paddle.y + PADDLE.height,
          'RIGHT'
        );
    }
    if (!action && ball.dx > 0) {
        action = intercept(
          ball.x,
          ball.y,
          ball.x + ball.dx,
          ball.y + ball.dy,
          paddle.x,
          paddle.y - BALL_RADIUS,
          paddle.x - BALL_RADIUS,
          paddle.y,
          'TOP_LEFT'
        );
    }
    if (!action && ball.dx > 0) {
        action = intercept(
          ball.x,
          ball.y,
          ball.x + ball.dx,
          ball.y + ball.dy,
          paddle.x - BALL_RADIUS,
          paddle.y,
          paddle.x - BALL_RADIUS,
          paddle.y + PADDLE.height,
          'LEFT'
        );
    }
    if (!action) {
        action = intercept(
          ball.x,
          ball.y,
          ball.x + ball.dx,
          ball.y + ball.dy,
          paddle.x,
          paddle.y + (PADDLE.height / 2) - BALL_RADIUS,
          paddle.x + paddle.width,
          paddle.y + (PADDLE.height / 2) - BALL_RADIUS,
          "TOP"
        );
    }
    return action;
}

// function for checking ball intercepting a block
function ballInterceptBlock(ball, block) {
    let action;
    if (ball.dx < 0) {
        action = intercept(
        ball.x,
        ball.y,
        ball.x + ball.dx,
        ball.y + ball.dy,
        block.x + BLOCK.width + BALL_RADIUS,
        block.y - BALL_RADIUS,
        block.x + BLOCK.width + BALL_RADIUS,
        block.y + BLOCK.height + BALL_RADIUS,
        'RIGHT'
        );
    }
    if (!action && ball.dx > 0) {
        action = intercept(
        ball.x,
        ball.y,
        ball.x + ball.dx,
        ball.y + ball.dy,
        block.x - BALL_RADIUS,
        block.y - BALL_RADIUS,
        block.x - BALL_RADIUS,
        block.y + BLOCK.height + BALL_RADIUS,
        'LEFT'
        );
    }
    if (!action && ball.dy < 0) {
        action = intercept(
        ball.x,
        ball.y,
        ball.x + ball.dx,
        ball.y + ball.dy,
        block.x - BALL_RADIUS,
        block.y + BLOCK.height + BALL_RADIUS,
        block.x + BLOCK.width + BALL_RADIUS,
        block.y + BLOCK.height + BALL_RADIUS,
        'BOTTOM'
        );
    }
    if (!action && ball.dy > 0) {
        action = intercept(
        ball.x,
        ball.y,
        ball.x + ball.dx,
        ball.y + ball.dy,
        block.x - BALL_RADIUS,
        block.y - BALL_RADIUS,
        block.x + BLOCK.width + BALL_RADIUS,
        block.y - BALL_RADIUS,
        'TOP'
        );
    }
    return action;
}