import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Edit, Mail, Phone, User, Lock } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useProfileUser } from "../hooks/use-profile-user";

export const ProfilePage = () => {
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((word) => word.charAt(0))
            .join("")
            .toUpperCase();
    };

    const {
        userData,
        editForm,
        handleEditSubmit,
        isEditModalOpen,
        setIsEditModalOpen,
        handleInputChange,
        editError,
        setIsPasswordModalOpen,
        showNewPassword,
        passwordError,
        setShowNewPassword,
        setConfirmPassword,
        setShowConfirmPassword,
        newPassword,
        confirmPassword,
        setNewPassword,
        isPasswordModalOpen,
        showConfirmPassword,
        handleModalClose,
        handlePasswordSubmit,
        handleEditModalClose,
        isLoadingPassword,
    } = useProfileUser();

    return (
        <div className="container mx-auto py-8 px-4 max-w-4xl">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                <Avatar className="h-24 w-24">
                    <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {getInitials(userData?.name || "Guest User")}
                    </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold text-gray-900">{userData?.name}</h1>
                    </div>
                    <p className="text-gray-600 text-lg">@{userData?.username}</p>
                </div>

                <div className="flex gap-2">
                    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Profile
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Edit Profile</DialogTitle>
                                <DialogDescription>Update your profile information below.</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleEditSubmit}>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-name">Full Name</Label>
                                        <Input
                                            id="edit-name"
                                            type="text"
                                            value={editForm.name}
                                            onChange={(e) => handleInputChange("name", e.target.value)}
                                            placeholder="Enter your full name"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="edit-username">Username</Label>
                                        <Input
                                            id="edit-username"
                                            type="text"
                                            value={editForm.username}
                                            onChange={(e) => handleInputChange("username", e.target.value)}
                                            placeholder="Enter your username"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="edit-email">Email Address</Label>
                                        <Input
                                            id="edit-email"
                                            type="email"
                                            value={editForm.email}
                                            onChange={(e) => handleInputChange("email", e.target.value)}
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="edit-phone">Phone Number</Label>
                                        <Input
                                            id="edit-phone"
                                            type="tel"
                                            value={editForm.phone_number}
                                            onChange={(e) => handleInputChange("phone_number", e.target.value)}
                                            placeholder="Enter your phone number"
                                            required
                                        />
                                    </div>

                                    {editError && <p className="text-sm text-red-600">{editError}</p>}
                                </div>

                                <DialogFooter>
                                    <Button type="button" variant="outline" onClick={handleEditModalClose}>
                                        Cancel
                                    </Button>
                                    <Button type="submit">Save Changes</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                    <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                                <Lock className="h-4 w-4 mr-2" />
                                Change Password
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Change Password</DialogTitle>
                                <DialogDescription>
                                    Enter your new password below. Make sure it's at least 6 characters long.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handlePasswordSubmit}>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="new-password">New Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="new-password"
                                                type={showNewPassword ? "text" : "password"}
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                placeholder="Enter new password"
                                                required
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                            >
                                                {showNewPassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="confirm-password"
                                                type={showConfirmPassword ? "text" : "password"}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder="Confirm new password"
                                                required
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </div>
                                    </div>

                                    {passwordError && <p className="text-sm text-red-600">{passwordError}</p>}
                                </div>

                                <DialogFooter>
                                    <Button type="button" variant="outline" onClick={handleModalClose}>
                                        Cancel
                                    </Button>
                                    <Button disabled={isLoadingPassword} type="submit">
                                        {isLoadingPassword ? "Changing..." : "Change Password"}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Personal Information
                            </CardTitle>
                            <CardDescription>Your personal details and contact information</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-gray-700">Full Name</p>
                                    <p className="text-gray-900 font-medium">{userData?.name}</p>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-gray-700">Username</p>
                                    <p className="text-gray-900 font-medium">@{userData?.username}</p>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Mail className="h-5 w-5 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-700 block">Email Address</p>
                                        <p className="text-gray-900">{userData?.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Phone className="h-5 w-5 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-700 block">Phone Number</p>
                                        <p className="text-gray-900">{userData?.phone_number}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
