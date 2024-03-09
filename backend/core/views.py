import subprocess

from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from .renderers import UserRenderer
from rest_framework.permissions import IsAuthenticated

from .serializers import UserRegisterationSerializer, UserLoginSerializer, UserProfileSerializer


# Utility function to generate JWT tokens for a user``
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


# View for user registration
class UserRegistrationView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = UserRegisterationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = get_tokens_for_user(user)
        user_info = UserProfileSerializer(user)
        return Response({'token':token, 'info':user_info.data}, status=status.HTTP_201_CREATED)


# View for user login
class UserLoginView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = UserLoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    username = serializer.data.get('username')
    password = serializer.data.get('password')
    user = authenticate(username=username, password=password)
    if user is not None:
        token = get_tokens_for_user(user)
        user_info = UserProfileSerializer(user)
        return Response({'token':token, 'info':user_info.data}, status=status.HTTP_200_OK)
    else:
        return Response({'errors':{'non_field_errors':['Username or Password is not Valid']}}, status=status.HTTP_404_NOT_FOUND)

# View for User Profile.
class UserProfileView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])  # Specify the HTTP methods this view should handle
@csrf_exempt
def opencam(request):
    # Your subprocess call remains the same
    subprocess.run(['python3', 'core/detect.py', '--weights', 'core/best.pt', '--source', '0'])

    # Return using DRF's Response object
    return Response({'message': 'Camera Opened'}, status=status.HTTP_200_OK)