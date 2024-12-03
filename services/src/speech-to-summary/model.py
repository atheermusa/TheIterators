import os
from openai import AzureOpenAI
import json


client = AzureOpenAI(
    azure_endpoint="https://team0-m48f90ux-eastus2.cognitiveservices.azure.com/OpenAI/deployments/whisper/audio/translations?api-version=2024-06-01",  # Azure OpenAI endpoint
    api_key="5z9jfzQOiUVlZRd3WZEKTmBtsXkLdDQAwMQcs3bWPieqLLGckrpMJQQJ99ALACHYHv6XJ3w3AAAAACOGc3NY",  # Azure OpenAI API key
    api_version="2024-02-01"  
)

gptclient = AzureOpenAI(
    azure_endpoint="https://team0-m48f90ux-eastus2.openai.azure.com/",  
    api_key="5z9jfzQOiUVlZRd3WZEKTmBtsXkLdDQAwMQcs3bWPieqLLGckrpMJQQJ99ALACHYHv6XJ3w3AAAAACOGc3NY",  
    api_version="2024-02-01"  
)


WHISPER_DEPLOYMENT_NAME = "whisper"  
GPT_DEPLOYMENT_NAME = "gpt-4o-mini"  


# Step 1: Transcribe audio using Whisper
def transcribe_audio(file_path):
    with open(file_path, "rb") as audio_file:
        transcription = client.audio.transcriptions.create(
            file=audio_file,
            model="whisper",
            
        )
    return transcription.text


# Step 2: Summarize the transcript using GPT
def summarize_transcript(transcript):
    response = gptclient.chat.completions.create(
        model='gpt-4o-mini',
        messages= [


    {

      "role": "system",

      "content": [

        {

          "type": "text",

          "text": "You are a model whose output is facing a call agent at Lloyds Banking Group. You will be given a transcript of an audio call.\n \nFrom the audio call, I want you to summarise what the customer wants to do in the app. Then, I want you to return the summary OF THE TRANSCRIPT.\n\nAfter this, return a section saying Suggested Journey: \" \", the blank to be replaced with a Journey like the ones below, but make it relevant to the transcript. Output should be in JSON format, with \"summary\" and \"suggested_journey\" sections.  \n\nJourney:\n\n- Find PIN\n- Replace Card  \n- Update Address  \n- Reset Password  \n- Activate Card  \n- Check Balance  \n- Transfer Funds  \n- Set Up Direct Debit  \n- Order Cheque Book  \n- Report Fraud  \n- Apply for Loan  \n- Open Savings Account  \n- Close Account  \n- Update Contact Info  \n- Set Up Online Banking  \n- Apply for Credit Card  \n- Dispute Transaction  \n- Set Up Alerts  \n- Update Beneficiaries  \n- Request Statement  \n- Set Up Budget  \n- Apply for Mortgage  \n- Report Lost Card  \n- Set Up Auto Pay  \n- Update Security Questions  \n- Apply for Personal Loan  \n- Order Replacement Card  \n- Set Up Savings Goal  \n- Update Email  \n- Apply for Business Loan  \n- Report Unauthorized Access"

        }

      ]

    },


    {

      "role": "user",

      "content":transcript

    }

  ],
        temperature=0.3,
    )
    
    return response.choices[0].message.content


# Step 3: Main Workflow
def process_audio_and_summarize(audio_file_path):
    print("Transcribing audio...")
    transcript = transcribe_audio(audio_file_path)
    print("Transcript:", transcript)

    print("\nSummarizing transcript...")
    summary = summarize_transcript(transcript)
    print("Summary:", summary)
    return summary


audio_file_path = "C:/Users/Habeeb/dev/TheIterators/audio/test.m4a"  # Replace with your audio file path
output = process_audio_and_summarize(audio_file_path)

with open('services/src/speech-to-summary/output.json','w') as json_file:
    json.dump(output, json_file, indent=4)
    