import * as Constants from "../Constants";
import { Skier } from '../Entities/Skier'

const skier = new Skier(0, 0);

test('Skier equals something', () => {
    console.log('skier log', skier)
    // expect(skier.direction).toBe(3);
    // expect(skier).toBe({ x: 0, y: 0, assetName: 'skierDown', direction: 3, speed: 10 });
    expect(skier.x).toBe(0);
    expect(skier.y).toBe(0);
    expect(skier.assetName).toBe('skierDown');
    expect(skier.direction).toBe(3);
    expect(skier.speed).toBe(10);
    

    skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH)   //  CRASH
    expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.CRASH);
    
    skier.turnRight()
    expect(skier.assetName).toBeDefined();
    
    skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH)
    skier.turnUp()
    expect(skier.assetName).toBeDefined();
    
    skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH)
    skier.turnDown()
    expect(skier.assetName).toBeDefined();
    
    skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH)
    skier.turnLeft()
    expect(skier.assetName).toBeDefined();
});
