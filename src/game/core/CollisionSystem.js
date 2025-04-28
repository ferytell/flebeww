export default class CollisionSystem {
  static checkEntityCollision(entity1, entity2) {
    return (
      entity1.x < entity2.x + entity2.width &&
      entity1.x + entity1.width > entity2.x &&
      entity1.y < entity2.y + entity2.height &&
      entity1.y + entity1.height > entity2.y
    );
  }

  static checkTileCollision(entity, tileMap, tileSize) {
    // Get the tiles that the entity overlaps with
    const leftTile = Math.floor(entity.x / tileSize);
    const rightTile = Math.floor((entity.x + entity.width) / tileSize);
    const topTile = Math.floor(entity.y / tileSize);
    const bottomTile = Math.floor((entity.y + entity.height) / tileSize);

    // Check all overlapping tiles
    for (let y = topTile; y <= bottomTile; y++) {
      for (let x = leftTile; x <= rightTile; x++) {
        if (tileMap[y] && tileMap[y][x] === 1) {
          // 1 represents a solid tile
          return true;
        }
      }
    }
    return false;
  }

  static resolveCollision(entity, tileMap, tileSize) {
    // Save original position
    const originalX = entity.x;
    const originalY = entity.y;

    // Check X axis
    entity.x += entity.direction.x * entity.speed;
    if (this.checkTileCollision(entity, tileMap, tileSize)) {
      entity.x = originalX;
    }

    // Check Y axis
    entity.y += entity.direction.y * entity.speed;
    if (this.checkTileCollision(entity, tileMap, tileSize)) {
      entity.y = originalY;
    }
  }
}
