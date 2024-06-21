import React, { useState } from 'react';

export const limitTextInputWidth = (event, ratio, setMessage) => {
    const input = event.target;
    const maxWidth = input.offsetWidth * ratio;
    const text = input.value;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = window.getComputedStyle(input).getPropertyValue('font');
    const textWidth = context.measureText(text).width;
    
    if (textWidth > maxWidth) {
      const charsToRemove = Math.ceil((textWidth - maxWidth) / context.measureText('a').width);
      input.value = text.slice(0, -charsToRemove);
    }

    // Utilisez la fonction setMessage passée en argument pour mettre à jour le state
    setMessage(input.value);
};
