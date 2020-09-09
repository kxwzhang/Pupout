// function for ball trajectory 
function intecept(ax, ay, bx, by, cx, cy, dx, dy, label) {
    // let the denominator be the difference of products
    let denom = ((dy - cy) * (bx - ax)) - ((dx - cx) * (by - ay));
    // check to make sure there is no zero-division
    if (denom !== 0) {
        let divisionA = ((dx - cx) * (ay - cy) - (dy - cy) * (ax - cx)) / denom;
        if ((divisionA >= 0) && (divisionA <= 1)) {
            let divisionB = ((bx - ax) * (ay - cy) - (by - ay) * (ax - cx)) / denom;
            console.log('divisionB: ', divisionB);
            if ((divisionB >= 0) && (divisionB <= 1)) {
                console.log('divisionA: ', divisionA);
                let x = ax + divisionA * (bx - ax);
                let y = ay + divisionA * (by - ay);
                return { x: x, y: y, dir: label };
            }
        }
    }
    return null; // if zero-division were to happen
}