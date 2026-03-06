import React, { useState, useEffect } from 'react';
import { ElevenLabsProvider } from "@elevenlabs/react-native";
import { RealtimeVoiceSession } from './RealtimeVoiceSession';
import { Platform } from 'react-native';

// Global flag to track if voice session has been requested
let voiceSessionRequested = false;

// Global setter to allow external components to request voice session loading
let requestVoiceSessionLoad: (() => void) | null = null;

/**
 * Request the voice session to be loaded.
 * This should be called when the user taps the microphone button.
 */
export function requestVoiceSession() {
    if (!voiceSessionRequested) {
        voiceSessionRequested = true;
        if (requestVoiceSessionLoad) {
            requestVoiceSessionLoad();
        }
    }
}

export const RealtimeProvider = ({ children }: { children: React.ReactNode }) => {
    // Only load RealtimeVoiceSession when explicitly requested (user taps mic button)
    // This prevents audio focus from being taken on app startup
    const [shouldLoadVoice, setShouldLoadVoice] = useState(false);

    useEffect(() => {
        // Store the setter globally so it can be called from outside
        requestVoiceSessionLoad = setShouldLoadVoice;

        return () => {
            requestVoiceSessionLoad = null;
        };
    }, []);

    return (
        <ElevenLabsProvider>
            {shouldLoadVoice && <RealtimeVoiceSession />}
            {children}
        </ElevenLabsProvider>
    );
};