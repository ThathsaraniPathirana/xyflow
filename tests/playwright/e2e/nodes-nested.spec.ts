import { test, expect, Locator } from '@playwright/test';

import { FRAMEWORK } from './constants';

test.describe('Nodes Nested', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tests/generic/nodes-nested/general');
  });

  test.describe('Grandchild Drag Handle', () => {

    test('dragging a grandchild node expands parent node', async ({ page }) => {
     
        const parentNode = page.locator(`.${FRAMEWORK}-flow__node[data-id="parent"]`);
        const childNode = page.locator(`.${FRAMEWORK}-flow__node[data-id="child"]`);
        const grandchildNode = page.locator(`.${FRAMEWORK}-flow__node[data-id="grandchild"]`);
    
        const initialParentBox = await parentNode.boundingBox();
        const initialChildBox = await childNode.boundingBox();
    
        await grandchildNode.hover();
        await page.mouse.down();
        await page.mouse.move(
          initialChildBox!.x + initialChildBox!.width - 5,
          initialChildBox!.y + initialChildBox!.height - 5
        );
        await page.mouse.up();
    
        const updatedParentBox = await parentNode.boundingBox();
        const updatedChildBox = await childNode.boundingBox();
    
        expect(updatedParentBox!.width).toBeGreaterThan(initialParentBox!.width);
        expect(updatedParentBox!.height).toBeGreaterThan(initialParentBox!.height);
        expect(updatedChildBox!.width).toBeGreaterThan(initialChildBox!.width);
        expect(updatedChildBox!.height).toBeGreaterThan(initialChildBox!.height);
    
        const grandchildBox = await grandchildNode.boundingBox();
        const tolerance = 1;
        expect(grandchildBox!.x + grandchildBox!.width).toBeLessThanOrEqual(updatedChildBox!.x + updatedChildBox!.width + tolerance);
        expect(grandchildBox!.y + grandchildBox!.height).toBeLessThanOrEqual(updatedChildBox!.y + updatedChildBox!.height + tolerance);
        expect(grandchildBox!.x + grandchildBox!.width).toBeLessThanOrEqual(updatedParentBox!.x + updatedParentBox!.width + tolerance);
        expect(grandchildBox!.y + grandchildBox!.height).toBeLessThanOrEqual(updatedParentBox!.y + updatedParentBox!.height + tolerance);
      });
  });

});
