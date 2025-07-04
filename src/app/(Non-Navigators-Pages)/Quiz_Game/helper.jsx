import { Graphics, Container } from "pixi.js";

export async function addSun(app) {
  const response = await fetch("/assets/sun.svg");
  const svgText = await response.text();
  const graphics = new Graphics().svg(svgText);

  await graphics.svgReady;
  const bounds = graphics.getLocalBounds();
  graphics.pivot.set(bounds.width / 2, bounds.height / 2);
  graphics.x = app.screen.width - 100;
  graphics.y = 120;
  graphics.scale.set(0.1);
  app.stage.addChild(graphics);

  //   app.ticker.add(() => {
  //     graphics.rotation += 0.005;
  //   });

  return graphics;
}

export function createMountainGroup(app) {
  const graphics = new Graphics();
  const width = app.screen.width / 2;
  const startY = app.screen.height;
  const startXLeft = 0;
  const startXMiddle = Number(app.screen.width) / 4;
  const startXRight = app.screen.width / 2;
  const heightLeft = app.screen.height / 2;
  const heightMiddle = (app.screen.height * 4) / 5;
  const heightRight = (app.screen.height * 2) / 3;
  const colorLeft = 0xc1ffc1;
  const colorMiddle = 0x7fcf7f;
  const colorRight = 0x90d890;

  graphics
    .moveTo(startXMiddle, startY)
    .bezierCurveTo(
      startXMiddle + width / 2,
      startY - heightMiddle,
      startXMiddle + width / 2,
      startY - heightMiddle,
      startXMiddle + width,
      startY
    )
    .fill({ color: colorMiddle })
    .moveTo(startXLeft, startY)
    .bezierCurveTo(
      startXLeft + width / 2,
      startY - heightLeft,
      startXLeft + width / 2,
      startY - heightLeft,
      startXLeft + width,
      startY
    )
    .fill({ color: colorLeft })
    .moveTo(startXRight, startY)
    .bezierCurveTo(
      startXRight + width / 2,
      startY - heightRight,
      startXRight + width / 2,
      startY - heightRight,
      startXRight + width,
      startY
    )
    .fill({ color: colorRight });

  return graphics;
}

export function addMountains(app) {
  const group1 = createMountainGroup(app);
  const group2 = createMountainGroup(app);

  group2.x = app.screen.width;
  app.stage.addChild(group1, group2);

  // app.ticker.add((time) => {
  //   const dx = time.deltaTime * 0.5;
  //   group1.x -= dx;
  //   group2.x -= dx;

  //   if (group1.x <= -app.screen.width) {
  //     group1.x += app.screen.width * 2;
  //   }
  //   if (group2.x <= -app.screen.width) {
  //     group2.x += app.screen.width * 2;
  //   }
  // });

  return [group1, group2];
}

export function addSmokes(app, train) {
  const groupCount = 5;
  const particleCount = 7;

  // Create an array to store all the smoke groups.
  const groups = [];

  for (let index = 0; index < groupCount; index++) {
    const smokeGroup = new Graphics();

    for (let i = 0; i < particleCount; i++) {
      // Randomize the position and radius of each particle.
      const radius = 20 + Math.random() * 20;
      const x = (Math.random() * 2 - 1) * 40;
      const y = (Math.random() * 2 - 1) * 40;

      // Draw a smoke particle.
      smokeGroup.circle(x, y, radius);
    }

    // Fill the smoke group with gray color.
    smokeGroup.fill({ color: 0xc9c9c9 });

    // Initial position (will be updated every frame)
    smokeGroup.x = train.x + 170;
    smokeGroup.y = train.y - 120;

    // Add a tick custom property to the smoke group for storing the animation progress ratio.
    smokeGroup.tick = index * (1 / groupCount);

    // Add the smoke group to the stage and the reference array.
    app.stage.addChild(smokeGroup);
    groups.push(smokeGroup);
  }

  // Animate the smoke groups.
  const smokeTicker = app.ticker.add((time) => {
    // Recalculate the emitter position based on the train's current position
    const baseX = train.x + 170;
    const baseY = train.y - 120;
    // Calculate the change in amount of animation progress ratio per tick.
    const dt = time.deltaTime * 0.01;

    groups.forEach((group) => {
      // Update the animation progress ratio.
      group.tick = (group.tick + dt) % 1;

      // Update the position and scale of the smoke group based on the animation progress ratio.
      group.x = baseX - Math.pow(group.tick, 2) * 400;
      group.y = baseY - group.tick * 200;
      group.scale.set(Math.pow(group.tick, 0.75));
      group.alpha = 1 - Math.pow(group.tick, 0.5);
    });
  });

  const cleanupSmokes = () => {
    if (smokeTicker) {
      app.ticker.remove(smokeTicker);
    }
    groups.forEach((smoke) => {
      if (smoke && smoke.parent) {
        smoke.parent.removeChild(smoke);
      }
    });
  };

  return { groups, cleanupSmokes };
}

export function addGround(app) {
  const width = app.screen.width;

  // Create and draw the bottom ground graphic.
  const groundHeight = 20;
  const groundY = app.screen.height;
  const ground = new Graphics()
    .rect(0, groundY - groundHeight, width, groundHeight)
    .fill({ color: 0xdddddd });

  // Add the ground to the stage.
  app.stage.addChild(ground);

  // Define the total height of the track. Both the planks and the rail layers.
  const trackHeight = 15;

  // Define the dimensions and parameters for the planks.
  const plankWidth = 50;
  const plankHeight = trackHeight / 2;
  const plankGap = 20;
  const plankCount = width / (plankWidth + plankGap) + 1;
  const plankY = groundY - groundHeight;

  // Create an array to store all the planks.
  const planks = [];

  for (let index = 0; index < plankCount; index++) {
    // Create and draw a plank graphic.
    const plank = new Graphics()
      .rect(0, plankY - plankHeight, plankWidth, plankHeight)
      .fill({ color: 0x241811 });

    // Position the plank to distribute it across the screen.
    plank.x = index * (plankWidth + plankGap);

    // Add the plank to the stage and the reference array.
    app.stage.addChild(plank);
    planks.push(plank);
  }

  // Create and draw the rail strip graphic.
  const railHeight = trackHeight / 2;
  const railY = plankY - plankHeight;
  const rail = new Graphics()
    .rect(0, railY - railHeight, width, railHeight)
    .fill({ color: 0x5c5c5c });

  // Add the rail to the stage.
  app.stage.addChild(rail);

  // Create animation function that can be controlled
  let animationActive = false;
  let animationTicker = null;

  const startGroundAnimation = () => {
    if (animationActive) return;
    animationActive = true;

    animationTicker = app.ticker.add((time) => {
      if (!animationActive) return;

      // Calculate the amount of distance to move the planks per tick.
      const dx = time.deltaTime * 2; // Reduced from 6 to 2 for slower movement

      planks.forEach((plank) => {
        // Move the planks leftwards.
        plank.x -= dx;

        // Reposition the planks when they move off screen.
        if (plank.x <= -(plankWidth + plankGap)) {
          plank.x += plankCount * (plankWidth + plankGap) + plankGap * 1.5;
        }
      });
    });
  };

  const stopGroundAnimation = () => {
    animationActive = false;
    if (animationTicker) {
      app.ticker.remove(animationTicker);
      animationTicker = null;
    }
  };

  const resizeGround = (newWidth, newHeight) => {
    // Update ground
    ground.clear();
    ground
      .rect(0, newHeight - groundHeight, newWidth, groundHeight)
      .fill({ color: 0xdddddd });

    // Update rail
    rail.clear();
    rail
      .rect(
        0,
        newHeight - groundHeight - plankHeight - railHeight,
        newWidth,
        railHeight
      )
      .fill({ color: 0x5c5c5c });

    // Remove old planks
    planks.forEach((plank) => {
      if (plank.parent) {
        plank.parent.removeChild(plank);
      }
    });
    planks.length = 0;

    // Create new planks for new width
    const newPlankCount = newWidth / (plankWidth + plankGap) + 1;
    const newPlankY = newHeight - groundHeight;

    for (let index = 0; index < newPlankCount; index++) {
      const plank = new Graphics()
        .rect(0, newPlankY - plankHeight, plankWidth, plankHeight)
        .fill({ color: 0x241811 });

      plank.x = index * (plankWidth + plankGap);
      app.stage.addChild(plank);
      planks.push(plank);
    }
  };

  return {
    ground,
    planks,
    rail,
    startGroundAnimation,
    stopGroundAnimation,
    resizeGround,
  };
}

export function addTrain(app) {
  const container = new Container();
  const head = createTrainHead(app);
  const carriage = createTrainCarriage(app);

  // Position the carriage behind the head.
  carriage.x = -carriage.width;

  // Add the head and the carriage to the train container.
  container.addChild(head, carriage);

  // Add the train container to the stage.
  app.stage.addChild(container);

  const scale = 0.75;

  // Adjust the scaling of the train.
  container.scale.set(scale);

  // Position the train on the x-axis, taking into account the variety of screen width.
  // To keep the train as the main focus, the train is offset slightly to the left of the screen center.
  //   container.x = app.screen.width / 2 - head.width / 2;
  container.x = head.width / 2;

  // Define animation parameters.
  let elapsed = 0;
  const shakeDistance = 3;
  const baseY = app.screen.height - 35 - 55 * scale;
  const speed = 0.2; // Reduced from 0.5 to 0.2 for slower bobbing

  // Initially position the train on the y-axis.
  container.y = baseY;

  // Create animation control functions
  let trainAnimationActive = false;
  let trainAnimationTicker = null;
  let wheelAnimationActive = false;
  let wheelAnimationTicker = null;

  const startTrainAnimation = () => {
    if (trainAnimationActive) return;
    trainAnimationActive = true;

    trainAnimationTicker = app.ticker.add((time) => {
      if (!trainAnimationActive) return;

      elapsed += time.deltaTime;
      const offset =
        (Math.sin(elapsed * 0.5 * speed) * 0.5 + 0.5) * shakeDistance;

      container.y = baseY + offset;
    });
  };

  const stopTrainAnimation = () => {
    trainAnimationActive = false;
    if (trainAnimationTicker) {
      app.ticker.remove(trainAnimationTicker);
      trainAnimationTicker = null;
    }
    // Reset train position
    container.y = baseY;
  };

  const startWheelAnimation = () => {
    if (wheelAnimationActive) return;
    wheelAnimationActive = true;

    wheelAnimationTicker = app.ticker.add((time) => {
      if (!wheelAnimationActive) return;

      const dr = time.deltaTime * 0.05; // Reduced from 0.15 to 0.05 for slower rotation

      // Animate head wheels
      const headWheels = head.children.filter(
        (child) => child !== head.children[0]
      ); // Exclude graphics
      headWheels.forEach((wheel, index) => {
        if (index === 0) {
          // Big wheel
          wheel.rotation += dr * (35 / 55); // smallWheelRadius / bigWheelRadius
        } else {
          wheel.rotation += dr;
        }
      });

      // Animate carriage wheels
      const carriageWheels = carriage.children.filter(
        (child) => child !== carriage.children[0]
      ); // Exclude graphics
      carriageWheels.forEach((wheel) => {
        wheel.rotation += dr;
      });
    });
  };

  const stopWheelAnimation = () => {
    wheelAnimationActive = false;
    if (wheelAnimationTicker) {
      app.ticker.remove(wheelAnimationTicker);
      wheelAnimationTicker = null;
    }
  };

  const resizeTrain = (newWidth, newHeight) => {
    // Update base Y position for new height
    const newBaseY = newHeight - 35 - 55 * scale;
    container.y = newBaseY;
  };

  return {
    container,
    startTrainAnimation,
    stopTrainAnimation,
    startWheelAnimation,
    stopWheelAnimation,
    resizeTrain,
  };
}

function createTrainHead(app) {
  // Create a container to hold all the train head parts.
  const container = new Container();

  // Define the dimensions of the head front.
  const frontHeight = 100;
  const frontWidth = 140;
  const frontRadius = frontHeight / 2;

  // Define the dimensions of the cabin.
  const cabinHeight = 200;
  const cabinWidth = 150;
  const cabinRadius = 15;

  // Define the dimensions of the chimney.
  const chimneyBaseWidth = 30;
  const chimneyTopWidth = 50;
  const chimneyHeight = 70;
  const chimneyDomeHeight = 25;
  const chimneyTopOffset = (chimneyTopWidth - chimneyBaseWidth) / 2;
  const chimneyStartX =
    cabinWidth + frontWidth - frontRadius - chimneyBaseWidth;
  const chimneyStartY = -frontHeight;

  // Define the dimensions of the roof.
  const roofHeight = 25;
  const roofExcess = 20;

  // Define the dimensions of the door.
  const doorWidth = cabinWidth * 0.7;
  const doorHeight = cabinHeight * 0.7;
  const doorStartX = (cabinWidth - doorWidth) * 0.5;
  const doorStartY = -(cabinHeight - doorHeight) * 0.5 - doorHeight;

  // Define the dimensions of the window.
  const windowWidth = doorWidth * 0.8;
  const windowHeight = doorHeight * 0.4;
  const offset = (doorWidth - windowWidth) / 2;

  const graphics = new Graphics()
    // Draw the chimney
    .moveTo(chimneyStartX, chimneyStartY)
    .lineTo(
      chimneyStartX - chimneyTopOffset,
      chimneyStartY - chimneyHeight + chimneyDomeHeight
    )
    .quadraticCurveTo(
      chimneyStartX + chimneyBaseWidth / 2,
      chimneyStartY - chimneyHeight - chimneyDomeHeight,
      chimneyStartX + chimneyBaseWidth + chimneyTopOffset,
      chimneyStartY - chimneyHeight + chimneyDomeHeight
    )
    .lineTo(chimneyStartX + chimneyBaseWidth, chimneyStartY)
    .fill({ color: 0x121212 })

    // Draw the head front
    .roundRect(
      cabinWidth - frontRadius - cabinRadius,
      -frontHeight,
      frontWidth + frontRadius + cabinRadius,
      frontHeight,
      frontRadius
    )
    .fill({ color: 0x7f3333 })

    // Draw the cabin
    .roundRect(0, -cabinHeight, cabinWidth, cabinHeight, cabinRadius)
    .fill({ color: 0x725f19 })

    // Draw the roof
    .rect(
      -roofExcess / 2,
      cabinRadius - cabinHeight - roofHeight,
      cabinWidth + roofExcess,
      roofHeight
    )
    .fill({ color: 0x52431c })

    // Draw the door
    .roundRect(doorStartX, doorStartY, doorWidth, doorHeight, cabinRadius)
    .stroke({ color: 0x52431c, width: 3 })

    // Draw the window
    .roundRect(
      doorStartX + offset,
      doorStartY + offset,
      windowWidth,
      windowHeight,
      10
    )
    .fill({ color: 0x848484 });

  // Define the dimensions of the wheels.
  const bigWheelRadius = 55;
  const smallWheelRadius = 35;
  const wheelGap = 5;
  const wheelOffsetY = 5;

  // Create all the wheels.
  const backWheel = createTrainWheel(bigWheelRadius);
  const midWheel = createTrainWheel(smallWheelRadius);
  const frontWheel = createTrainWheel(smallWheelRadius);

  // Position the wheels.
  backWheel.x = bigWheelRadius;
  backWheel.y = wheelOffsetY;
  midWheel.x = backWheel.x + bigWheelRadius + smallWheelRadius + wheelGap;
  midWheel.y = backWheel.y + bigWheelRadius - smallWheelRadius;
  frontWheel.x = midWheel.x + smallWheelRadius * 2 + wheelGap;
  frontWheel.y = midWheel.y;

  // Add all the parts to the container.
  container.addChild(graphics, backWheel, midWheel, frontWheel);

  return container;
}

function createTrainCarriage(app) {
  // Create a container to hold all the train carriage parts.
  const container = new Container();

  // Define the dimensions of the carriage parts.
  const containerHeight = 125;
  const containerWidth = 200;
  const containerRadius = 15;
  const edgeHeight = 25;
  const edgeExcess = 20;
  const connectorWidth = 30;
  const connectorHeight = 10;
  const connectorGap = 10;
  const connectorOffsetY = 20;

  const graphics = new Graphics()
    // Draw the body
    .roundRect(
      edgeExcess / 2,
      -containerHeight,
      containerWidth,
      containerHeight,
      containerRadius
    )
    .fill({ color: 0x725f19 })

    // Draw the top edge
    .rect(
      0,
      containerRadius - containerHeight - edgeHeight,
      containerWidth + edgeExcess,
      edgeHeight
    )
    .fill({ color: 0x52431c })

    // Draw the connectors
    .rect(
      containerWidth + edgeExcess / 2,
      -connectorOffsetY - connectorHeight,
      connectorWidth,
      connectorHeight
    )
    .rect(
      containerWidth + edgeExcess / 2,
      -connectorOffsetY - connectorHeight * 2 - connectorGap,
      connectorWidth,
      connectorHeight
    )
    .fill({ color: 0x121212 });

  // Define the dimensions of the wheels.
  const wheelRadius = 35;
  const wheelGap = 40;
  const centerX = (containerWidth + edgeExcess) / 2;
  const offsetX = wheelRadius + wheelGap / 2;

  // Create the wheels.
  const backWheel = createTrainWheel(wheelRadius);
  const frontWheel = createTrainWheel(wheelRadius);

  // Position the wheels.
  backWheel.x = centerX - offsetX;
  frontWheel.x = centerX + offsetX;
  frontWheel.y = backWheel.y = 25;

  // Add all the parts to the container.
  container.addChild(graphics, backWheel, frontWheel);

  return container;
}

function createTrainWheel(radius) {
  // Define the dimensions of the wheel.
  const strokeThickness = radius / 3;
  const innerRadius = radius - strokeThickness;

  return (
    new Graphics()
      .circle(0, 0, radius)
      // Draw the wheel
      .fill({ color: 0x848484 })
      // Draw the tyre
      .stroke({ color: 0x121212, width: strokeThickness, alignment: 1 })
      // Draw the spokes
      .rect(
        -strokeThickness / 2,
        -innerRadius,
        strokeThickness,
        innerRadius * 2
      )
      .rect(
        -innerRadius,
        -strokeThickness / 2,
        innerRadius * 2,
        strokeThickness
      )
      .fill({ color: 0x4f4f4f })
  );
}

export function createCelebrationEffect(app) {
  const confettiCount = 100;
  const sparkleCount = 30;
  const confettiPieces = [];
  const sparkles = [];

  // Create confetti pieces
  for (let i = 0; i < confettiCount; i++) {
    const confetti = new Graphics();
    const size = 5 + Math.random() * 10;
    const color = [
      0xff6b6b, // red
      0x4ecdc4, // teal
      0x45b7d1, // blue
      0x96ceb4, // green
      0xfeca57, // yellow
      0xff9ff3, // pink
      0x54a0ff, // light blue
      0x5f27cd, // purple
      0x00d2d3, // cyan
      0xff9f43, // orange
    ][Math.floor(Math.random() * 10)];

    confetti.rect(-size / 2, -size / 2, size, size).fill({ color: color });

    confetti.x = Math.random() * app.screen.width;
    confetti.y = -20;
    confetti.rotation = Math.random() * Math.PI * 2;
    confetti.velocityX = (Math.random() - 0.5) * 8;
    confetti.velocityY = Math.random() * 3 + 2;
    confetti.rotationSpeed = (Math.random() - 0.5) * 0.2;
    confetti.gravity = 0.1;
    confetti.bounce = 0.7;

    app.stage.addChild(confetti);
    confettiPieces.push(confetti);
  }

  // Create sparkles
  for (let i = 0; i < sparkleCount; i++) {
    const sparkle = new Graphics();
    const size = 3 + Math.random() * 6;
    const color = 0xffff00; // yellow sparkles

    // Create a star shape
    sparkle
      .moveTo(0, -size)
      .lineTo(size * 0.3, -size * 0.3)
      .lineTo(size, 0)
      .lineTo(size * 0.3, size * 0.3)
      .lineTo(0, size)
      .lineTo(-size * 0.3, size * 0.3)
      .lineTo(-size, 0)
      .lineTo(-size * 0.3, -size * 0.3)
      .closePath()
      .fill({ color: color });

    sparkle.x = Math.random() * app.screen.width;
    sparkle.y = Math.random() * app.screen.height;
    sparkle.alpha = 0;
    sparkle.scale.set(0);
    sparkle.targetScale = 0.5 + Math.random() * 0.5;
    sparkle.fadeInTime = Math.random() * 60; // frames
    sparkle.fadeOutTime = 120 + Math.random() * 60; // frames
    sparkle.currentTime = 0;

    app.stage.addChild(sparkle);
    sparkles.push(sparkle);
  }

  // Animation ticker
  const celebrationTicker = app.ticker.add(() => {
    // Animate confetti
    confettiPieces.forEach((confetti, index) => {
      confetti.velocityY += confetti.gravity;
      confetti.x += confetti.velocityX;
      confetti.y += confetti.velocityY;
      confetti.rotation += confetti.rotationSpeed;

      // Bounce off ground
      if (confetti.y > app.screen.height - 20) {
        confetti.y = app.screen.height - 20;
        confetti.velocityY *= -confetti.bounce;
        confetti.velocityX *= 0.8; // friction
      }

      // Remove confetti that's off screen or stopped
      if (
        confetti.y > app.screen.height + 50 ||
        (Math.abs(confetti.velocityY) < 0.1 &&
          confetti.y > app.screen.height - 25)
      ) {
        if (confetti.parent) {
          confetti.parent.removeChild(confetti);
        }
        confettiPieces.splice(index, 1);
      }
    });

    // Animate sparkles
    sparkles.forEach((sparkle, index) => {
      sparkle.currentTime++;

      if (sparkle.currentTime < sparkle.fadeInTime) {
        // Fade in
        sparkle.alpha = sparkle.currentTime / sparkle.fadeInTime;
        sparkle.scale.set(
          (sparkle.currentTime / sparkle.fadeInTime) * sparkle.targetScale
        );
      } else if (sparkle.currentTime < sparkle.fadeOutTime) {
        // Stay visible
        sparkle.alpha = 1;
        sparkle.scale.set(sparkle.targetScale);
      } else {
        // Fade out
        const fadeOutProgress =
          (sparkle.currentTime - sparkle.fadeOutTime) / 60;
        sparkle.alpha = Math.max(0, 1 - fadeOutProgress);
        sparkle.scale.set(sparkle.targetScale * (1 - fadeOutProgress * 0.5));

        // Remove sparkle when fully faded
        if (sparkle.alpha <= 0) {
          if (sparkle.parent) {
            sparkle.parent.removeChild(sparkle);
          }
          sparkles.splice(index, 1);
        }
      }
    });

    // Stop animation when all effects are done
    if (confettiPieces.length === 0 && sparkles.length === 0) {
      app.ticker.remove(celebrationTicker);
    }
  });

  const cleanupCelebration = () => {
    app.ticker.remove(celebrationTicker);
    confettiPieces.forEach((confetti) => {
      if (confetti.parent) {
        confetti.parent.removeChild(confetti);
      }
    });
    sparkles.forEach((sparkle) => {
      if (sparkle.parent) {
        sparkle.parent.removeChild(sparkle);
      }
    });
  };

  return { cleanupCelebration };
}
